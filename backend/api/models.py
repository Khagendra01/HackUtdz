from django.db import models

class LangchainPgCollection(models.Model):
    name = models.TextField(blank=True, null=True)
    cmetadata = models.TextField(blank=True, null=True)  # This field type is a guess.
    uuid = models.UUIDField(primary_key=True)

    class Meta:
        db_table = 'langchain_pg_collection'


class LangchainPgEmbedding(models.Model):
    uuid = models.UUIDField(primary_key=True)
    collection = models.ForeignKey(LangchainPgCollection, models.DO_NOTHING, blank=True, null=True)
    embedding = VectorField(dimensions=1536) 
    document = models.TextField(blank=True, null=True)
    cmetadata = models.TextField(blank=True, null=True)
    sours = models.CharField(blank=True, null=True, max_length=255) 

    class Meta:
        db_table = 'langchain_pg_embedding'
