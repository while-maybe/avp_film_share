from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.models import Token
from rest_framework import serializers

# import from the Users model in the data_api_app project
from data_api_app.models import Author

class AuthorSerializer(ModelSerializer):
    name = serializers.SerializerMethodField()
    title = serializers.CharField(write_only=True)
    firstname = serializers.CharField(write_only=True)
    lastname = serializers.CharField(write_only=True)
    # could we do password here as well? - not a CharField though...

    class Meta:
        model = Author
        fields = ['username', 'email', 'password', 'about', 'name', 'title', 'firstname', 'lastname']
        # extra_kwargs customizes behavior of model fields
        # we don't send plain text password back int the response!
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # override default save to include token
    def save(self):
        new_author = Author.objects.create_user(
            username = self.validated_data["username"],
            email = self.validated_data["email"],
            password = self.validated_data["password"],
            
            about = self.validated_data["about"],
            title = self.validated_data["title"],
            firstname = self.validated_data["firstname"],
            lastname = self.validated_data["lastname"],
        )

        token = Token.objects.create(user=new_author)
        return token

    def get_name(self, obj):
        # handle dict data if a request
        if isinstance(obj, dict):
            return f"{obj['title']} {obj['firstname']} {obj['lastname']}"
        # or obj data if getting data from db
        return f"{obj.title} {obj.firstname} {obj.lastname}"