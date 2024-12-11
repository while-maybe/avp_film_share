from rest_framework.serializers import ModelSerializer
from .models import Video

class VideoSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields = ['video_id', 'title', 'location', 'comment', 'slug', 'date_released', 'likes']
        read_only_fields = ['video_id', 'author_id', 'date_uploaded', 'likes']


