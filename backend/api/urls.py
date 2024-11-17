from django.urls import path
from .views import ( GenerateEmbedding, Finance_ai )

urlpatterns = [

    path('generate_embedding/', GenerateEmbedding.as_view(), name='generate_embedding'),
    path('askagent/', Finance_ai.as_view(), name='finance_ai'),
    

    
]