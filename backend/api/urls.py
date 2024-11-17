from django.urls import path
from .views import ( GenerateEmbedding, Finance_ai )

urlpatterns = [

    path('generate_embedding/', GenerateEmbedding.as_view(), name='generate_embedding'),
    path('finance_ai/', Finance_ai.as_view(), name='finance_ai'),
    
]