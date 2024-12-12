# from rest_framework.decorators import api_view, authentication_classes, permission_classes

from rest_framework.response import Response
from rest_framework.status import *

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout

# imports for auth
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView

# import Author from data_api & AuthorSerializer
from data_api_app.models import Author
from .serializers import AuthorSerializer


# TODO api key auth
# TODO investigate OTP validation


# Create your views here.
class AuthorSignupCreateView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = AuthorSerializer
    
    def create(self, request):
        serializer = AuthorSerializer(data=request.data)
        
        if serializer.is_valid():
            token = serializer.save() # save returns object

            data = {
                "author": serializer.data,
                "token": token.key
            }
            
            return Response(data, status=HTTP_201_CREATED)
        
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class AuthorLogoutCreateView(CreateAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def create(self, request):
        logout(request._request)
        request.user.auth_token.delete()
        return Response({"message": "logged out"}, status=HTTP_200_OK)


class AuthorLoginCreateView(CreateAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [AllowAny]
    def create(self, request):

        data = request.data
        print(data.keys())
        authenticated_user = authenticate(
            # .get() is better than request['username'] because I get None instead of error
            username=request.data.get('username'),
            password=request.data.get('password')
        )
        
        if authenticated_user is None:
            return Response({"error": "Invalid username/password"}, status=HTTP_401_UNAUTHORIZED)

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
