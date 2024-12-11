from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from rest_framework.authtoken.models import Token
# import from the Users model in the data_api_app project
from data_api_app.models import Author

class AuthorSerializer(ModelSerializer):    
    class Meta:
        model = Author
        fields = ['username', 'email', 'password']
        # extra_kwargs customizes behavior of model fields
        # we don't send plain text password back int the response!
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    # override default save to include token
    def save(self, **kwargs):
        new_author = Author.objects.create_user(
            username = self.validated_data["username"],
            email = self.validated_data["email"],
            password = self.validated_data["password"],
        )
        
        token = Token.objects.create(user=new_author)
        # new_author.save()
        return new_author, token
        