from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate
import os
from .models import LangchainPgEmbedding
from pgvector.django import L2Distance
from .embedding import get_embedding
load_dotenv()


def get_finance_response(question, past_convo):

    def retrieve_docs():
        embedding = get_embedding(question)
        documents = LangchainPgEmbedding.objects.order_by(L2Distance('embedding', embedding))[:5]
        docs = ""
        citation = set()
        for embedding in documents:
            docs += embedding.document + "\n"
            citation.add(embedding.sours)
        return docs, citation
    
    docs, citation = retrieve_docs()
    system_message = f"""
    You are a specialized finance AI assistant designed to help students with finance-related questions and tasks. Your primary function is to provide accurate and helpful information based on the given context.

    Instructions:
    1. Analyze the provided context carefully.
    2. Attempt to answer questions or provide assistance using only the information present in the context.
    3. Clearly indicate when you are using information from the context versus your own knowledge.
    4. If you cannot find a suitable answer in the context, past conversation or your own knowledge, politely inform the student and suggest they seek additional resources or clarify their question.

    Context:
    {docs}

    Past Convo:
    {past_convo}

    Remember to maintain a professional and educational tone in your responses, tailored to assist students in understanding financial concepts and solving finance-related problems.
    """

    # Define the prompt template
    prompt_template = ChatPromptTemplate.from_messages([
        ("system", system_message),
        ("human", "{question}")
    ])

    # Create the language model
    llm = ChatOpenAI(model_name="gpt-4o", api_key=os.getenv("OPENAI_API_KEY"))

    # Create the chain
    chain = LLMChain(llm=llm, prompt=prompt_template)

    # Run the chain
    response = chain.run(question=question, docs=docs)


    work_cited = "Work Cited: "
    for cite in citation:
        work_cited += cite + '\n'

    return response, work_cited

