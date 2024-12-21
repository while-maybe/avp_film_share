from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Video

class VideoSerializer(ModelSerializer):
    author_username = SerializerMethodField()
    # full_name is a computed property but method field might still work the same?
    author_full_name = SerializerMethodField()
    
    def get_author_username(self, obj):
        return obj.author_id.username
    
    def get_author_full_name(self, obj):
        return obj.author_id.full_name
    
    class Meta:
        model = Video
        fields = ['video_id', 'title', 'location', 'description', 'slug', 'date_released', 'date_uploaded', 'likes', 'author_username', 'author_full_name']
        read_only_fields = ['video_id', 'author_id', 'date_uploaded', 'likes']
