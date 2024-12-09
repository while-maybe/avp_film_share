from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework.status import * # Good for HTTP descriptive consts

from .models import Video
from .serializers import VideoSerializer

# Create your views here.
@api_view(['GET'])
def get(request):
    return Response({"Success": "The setup was successful"})

@api_view(['GET'])
def all_videos(request):
    all_videos = Video.objects.all()
    serializer = VideoSerializer(all_videos, many=True) # many=True needed otherwise Django would think one item only
    return Response(serializer.data, status=HTTP_200_OK)

@api_view(['GET', 'POST'])
def add_video(request):
    
    video_title = get(Video, title=request.data)
    print(video_title)
    
    # serializer = VideoSerializer(data=request.data)
    # # TODO check if the video already exists! - check by title
    # # existing_titles = [video.title.lower() for video in Video.objects.all()]
    
    # if serializer.is_valid():
    #     if Video.objects.filter(title__iexact=serializer.data['title']).exists():
    #         return Response({"Error": "Video already exists"}, status=HTTP_400_BAD_REQUEST)
    #     else:
    #         serializer.save()
    #         return Response({"Success": "The video was successfully created"}, status=HTTP_201_CREATED)
    
    # return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def del_video(request):
    video_id = request.data.get('video_id')
    try:
        video = get_object_or_404(Video, id=video_id)
        video.delete()
        return Response({"Success": "Video was successfully deleted"}, status=HTTP_204_NO_CONTENT)
    except Video.DoesNotExist:
        return Response({"Error": "Video does not exist"}, status=HTTP_404_NOT_FOUND)
    