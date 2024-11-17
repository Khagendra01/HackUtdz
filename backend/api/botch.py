from dotenv import load_dotenv
from langchain.agents import AgentType, initialize_agent
from langchain.chat_models import ChatOpenAI
from langchain.tools import Tool
from langchain.prompts import ChatPromptTemplate
import os
from .models import LangchainPgEmbedding
from pgvector.django import L2Distance
from .embedding import get_embedding

load_dotenv()

def retrieve_docs(question):
    """
    Retrieve relevant documents based on semantic similarity
    
    Args:
        question (str): Input question to find relevant documents
    
    Returns:
        tuple: Concatenated documents and their sources
    """
    embedding = get_embedding(question)
    documents = LangchainPgEmbedding.objects.order_by(L2Distance('embedding', embedding))[:5]
    docs = ""
    citation = set()
    for embedding in documents:
        docs += embedding.document + "\n"
        citation.add(embedding.sours)
    return docs, citation

def get_finance_response(question, past_convo):
    """
    Generate a finance-related response using an agent framework
    
    Args:
        question (str): User's input question
        past_convo (str): Previous conversation context
    
    Returns:
        tuple: Generated response and work citations
    """
    # Retrieve relevant documents
    docs, citation = retrieve_docs(question)
    
    # Construct system message with context
    system_message = f"""
    You are a specialized finance AI assistant designed to help students with finance-related questions and tasks. 
    Your primary function is to provide accurate and helpful information based on the given context.

    Key Guidelines:
    1. Analyze the provided context meticulously
    2. Answer questions using information from the context
    3. Clearly distinguish between contextual and general knowledge
    4. If no suitable answer is found, ask for additional research or clarification
    5. Do not

    Available Context:
    {docs}

    Previous Conversation:
    {past_convo}

    Maintain a professional, educational tone focused on financial understanding.
    """

    # Create prompt template
    prompt_template = ChatPromptTemplate.from_messages([
        ("system", system_message),
        ("human", "{question}")
    ])

    # Initialize language model
    llm = ChatOpenAI(
        model_name="gpt-4o", 
        api_key=os.getenv("OPENAI_API_KEY"),
        temperature=0.3  # Lower temperature for more focused responses
    )

    # Define tools for the agent
    tools = [
        Tool(
            name="Finance Knowledge Base",
            func=lambda x: docs,
            description="Retrieve finance-related information from the knowledge base"
        )
    ]

    # Initialize agent without memory
    agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=False,  # Set to True for debugging
        handle_parsing_errors=True
    )

    # Generate response
    try:
        response = agent.run(input=question)
    except Exception as e:
        response = f"An error occurred: {str(e)}. Please try rephrasing your question."

    # Prepare work citations
    work_cited = "Work Cited: " + "\n".join(citation)

    return response, work_cited