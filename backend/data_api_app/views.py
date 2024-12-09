from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework.status import * # Good for HTTP descriptive consts

from .models import Video
from .serializers import VideoSerializer

# Create your views here.
@api_view(['GET'])
def all_videos(request):
    all_videos = Video.objects.all()
    serializer = VideoSerializer(all_videos, many=True) # many=True needed otherwise Django would think one item only
    return Response(serializer.data, status=HTTP_200_OK)


@api_view(['GET'])
def get(request):
    return Response({"success": "The setup was successful"})


@api_view(['POST'])
def add_video(request):
    try:
        serializer = VideoSerializer(data=request.data)
        
        if Video.objects.filter(title__iexact=serializer.validated_data['title']).exists():
            return Response({"error": "Video already exists"}, status=HTTP_400_BAD_REQUEST)
            
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
            
        serializer.save()
        return Response({"success": "Video created successfully"}, status=HTTP_201_CREATED)
    
    except Exception as e:
        return Response({"error": f"Can't add video"}, status=HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def del_video(request):
    video_id = request.data.get('video_id')
    try:
        video = get_object_or_404(Video, id=video_id)
        video.delete()
        return Response({"success": "Video was successfully deleted"}, status=HTTP_204_NO_CONTENT)
    except Video.DoesNotExist:
        return Response({"error": "Video does not exist"}, status=HTTP_404_NOT_FOUND)
    