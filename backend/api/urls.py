from django.urls import path

urlpatterns = [
    # User URLs
    path('do/', view, name='customuser-list-create')
]