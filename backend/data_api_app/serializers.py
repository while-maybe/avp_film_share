from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Video

class VideoSerializer(ModelSerializer):
    author_username = SerializerMethodField()
    
    def get_author_username(self, obj):
        return obj.author_id.username
    
    class Meta:
        model = Video
        fields = ['video_id', 'title', 'location', 'description', 'slug', 'date_released', 'likes', 'author_username']
        read_only_fields = ['video_id', 'author_id', 'date_uploaded', 'likes', 'slug']
