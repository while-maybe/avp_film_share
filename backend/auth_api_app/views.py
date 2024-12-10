from django.shortcuts import render
from rest_framework.decorators import api_view

# from django.contrib.auth.models import User
from data_api_app.models import Author

from rest_framework.response import Response
from rest_framework import status


from .serializers import AuthorSerializer
from rest_framework.authtoken.models import Token

# Create your views here.
@api_view(["POST"])
def signup(request):
    serializer = AuthorSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
        # author as a response
        author = Author.objects.get(username=request.data['username'])
        token = Token.objects.get(user=author)
        
        serializer = AuthorSerializer(author)
        
        data = {
            "author": serializer.data,
            "token": token.key
        }
        
        return Response(data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    
    return Response({"message": "login endpoint"})

@api_view(["GET"])
def logout(request):
    
    return Response({"message": "logout endpoint"})

@api_view(["POST"])
def test_view(request):
    
    return Response({"message": "test_view endpoint"})