from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.status import *

# Create your views here.
def signup(request):
    
    return Response({"message": "signup endpoint"})


def login(request):
    
    return Response({"message": "login endpoint"})


def logout(request):
    
    return Response({"message": "logout endpoint"})


def test_view(request):
    
    return Response({"message": "test_view endpoint"})