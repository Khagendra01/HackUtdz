# Generated by Django 5.1.3 on 2024-11-17 07:25

import django.db.models.deletion
import pgvector.django.vector
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LangchainPgCollection',
            fields=[
                ('name', models.TextField(blank=True, null=True)),
                ('cmetadata', models.TextField(blank=True, null=True)),
                ('uuid', models.UUIDField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'langchain_pg_collection',
            },
        ),
        migrations.CreateModel(
            name='LangchainPgEmbedding',
            fields=[
                ('uuid', models.UUIDField(primary_key=True, serialize=False)),
                ('embedding', pgvector.django.vector.VectorField(dimensions=1536)),
                ('document', models.TextField(blank=True, null=True)),
                ('cmetadata', models.TextField(blank=True, null=True)),
                ('sours', models.CharField(blank=True, max_length=255, null=True)),
                ('collection', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.langchainpgcollection')),
            ],
            options={
                'db_table': 'langchain_pg_embedding',
            },
        ),
    ]