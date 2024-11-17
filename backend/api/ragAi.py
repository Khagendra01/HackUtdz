from langchain.agents import AgentType, initialize_agent
from langchain.chat_models import ChatOpenAI
from langchain.tools import Tool
from langchain.prompts import ChatPromptTemplate
from .models import LangchainPgEmbedding
from pgvector.django import L2Distance
from .embedding import get_embedding
from dotenv import load_dotenv

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
    # Retrieve relevant documents
    docs, citation = retrieve_docs(question)
    
    # Create a tool for document retrieval
    retrieval_tool = Tool(
        name="Document Retrieval",
        func=lambda q: retrieve_docs(q)[0],
        description="Retrieves relevant documents based on the question."
    )
    
    # Create the language model
    llm = ChatOpenAI(temperature=0, model_name="gpt-4o")
    
    # Create the agent
    agent = initialize_agent(
        [retrieval_tool],
        llm,
        agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
        handle_parsing_errors=False,
        verbose=True
    )
    
    # Prepare the context
    context = f"Past conversation:\n{past_convo}\n\nRelevant documents:\n{docs}"
    
    # Create the prompt template
    prompt_template = ChatPromptTemplate.from_template(
        "Only answer if the question is related to Past conversation, relevant documents."
        "You are a financial advisor. Use the following context to answer the question:\n"
        "{context}\n\n"
        "Question: {question}\n"
        "Answer: "
    )
    
    try:
        response = agent.run(prompt_template.format(context=context, question=question))
    except Exception as e:
        response = "Sorrry, I am finance agent and can only answer finance related question."
        citation = []
    
    return response, list(citation)