from rest_framework.decorators import api_view

from rest_framework.response import Response
from rest_framework.status import *

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

# import Author from data_api & AuthorSerializer
from data_api_app.models import Author
from .serializers import AuthorSerializer

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
        
        return Response(data, status=HTTP_201_CREATED)
    
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    
    data = request.data
    authenticated_user = authenticate(username=data["username"], password=data['password'])
    
    if authenticated_user is None:
        return Response({"error": "Invalid username/password"}, status=HTTP_400_BAD_REQUEST)
    
    # if the user is authenticated do the below
    author = Author.objects.get(username=data['username'])
    serializer = AuthorSerializer(author)
    
    existing_token, new_token = Token.objects.get_or_create(user=author)

    data = {
        "author": serializer.data,
        # we can do logical operator short-circuiting in Python as well...
        "token": existing_token.key or new_token.key
    }
    return Response(data, status=HTTP_200_OK)
    

@api_view(["GET"])
def logout(request):
    
    return Response({"message": "logout endpoint"})
