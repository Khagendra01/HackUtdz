from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LangchainPgEmbedding
from .ragAi import get_finance_response
from .embedding import get_embedding
import uuid

class CustomTextSplitter:
    def __init__(self, chunk_size, chunk_overlap):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def split_text(self, text):
        # Removing any additional newlines for splitting
        text = text.replace('\n\n', ' ')
        
        # List to hold the text chunks
        chunks = []
        
        # Split text into chunks based on chunk size and overlap
        start = 0
        while start < len(text):
            end = min(start + self.chunk_size, len(text))
            chunk = text[start:end]
            chunks.append(chunk)
            start += self.chunk_size - self.chunk_overlap
        
        return chunks
    
class GenerateEmbedding(APIView):
    def post(self, request):  
        content = request.data.get("content")
        sours = request.data.get("sours")
        custom_text_splitter = CustomTextSplitter(chunk_size=800, chunk_overlap=200)

        chunks = custom_text_splitter.split_text(content)
        for chunk in chunks:
                    gen_embedding = get_embedding(chunk)
                    LangchainPgEmbedding.objects.create(
                        uuid=uuid.uuid4(),
                        document=chunk,
                        embedding=gen_embedding,
                        sours=sours
                    )

        return Response(status=status.HTTP_200_OK)
    

class Finance_ai(APIView):  
    def post(self, request):
        content = request.data.get("user_msg")
        past_convo = request.data.get("last5")
        print(content)
        ai_msg, citation = get_finance_response(content, past_convo)
        return Response({
                'ai_msg': ai_msg,
                'citation': citation
            }, status=200)
