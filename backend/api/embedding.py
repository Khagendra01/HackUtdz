import openai
from dotenv import load_dotenv
import os
load_dotenv()

def get_embedding(text):
    text = text.replace("\n", " ")
    return openai.Embedding.create(input=text, api_key=os.getenv("OPENAI_API_KEY"), engine="text-embedding-ada-002")["data"][0]["embedding"]