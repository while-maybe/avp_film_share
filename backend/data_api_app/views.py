from rest_framework.response import Response 
from rest_framework.status import * # Good for HTTP descriptive consts
from rest_framework import filters

# imports for auth, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

# my stuff
from .models import Video
from .serializers import VideoSerializer

# drf API framework custome views
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, GenericAPIView

# swagger
from drf_spectacular.utils import extend_schema

import random, string

# Create your views here.
class VideoListView(ListAPIView):
    queryset = Video.objects.order_by('-date_uploaded').filter(is_deleted=False)
    search_fields = ['title', 'author_id__username']
    filter_backends = (filters.SearchFilter,)
    serializer_class = VideoSerializer


class VideoRetrieveView(RetrieveAPIView):
    queryset = Video.objects.order_by('-date_uploaded').filter(is_deleted=False)
    lookup_field = 'video_id'
    serializer_class = VideoSerializer


class VideoAddView(CreateAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer

    def post(self, request, *args, **kwargs):

        data = request.data
        # random slug for the video (just like youtube!)
        data["slug"] = "".join(random.choices(string.ascii_letters + string.digits, k=10))
        
        serializer = VideoSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        
        serializer.save(author_id=self.request.user)
        return Response({"success": "Video created successfully"}, status=HTTP_201_CREATED)


class VideoUpdateView(UpdateAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer
    
    def update(self, request, *args, **kwargs):
        video_id = kwargs.get('video_id')
        
        if video_id is None:
            return Response({"error": "You must provide a valid id"}, status=HTTP_400_BAD_REQUEST)
            
        try:
            video = Video.objects.get(video_id=video_id)
            
            print(video.author_id, request.user)
            if video.author_id != request.user:
                return Response({"error": "You can only update your own videos"}, status=HTTP_403_FORBIDDEN)

            serializer = VideoSerializer(
                video,
                data = request.data,
                partial = (request.method == "PATCH")
            )
            if not serializer.is_valid():
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
            
            serializer.save()
            return Response({"success": serializer.data}, status=HTTP_200_OK)
        
        except Video.DoesNotExist:
            return Response({"error": "Video does not exist"}, status=HTTP_404_NOT_FOUND)


class VideoDeleteView(DestroyAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer

    def delete(self, request, *args, **kwargs):
        video_id = kwargs.get('video_id')
        
        if video_id is None:
            return Response({"error": "You must provide a valid id"}, status=HTTP_400_BAD_REQUEST)
        
        try:
            video = Video.objects.get(video_id=video_id)

            if video.author_id != request.user:
                return Response({"error": "You can only delete your own videos"}, status=HTTP_403_FORBIDDEN)

            if video.is_deleted:
                raise Video.DoesNotExist
            
            video.is_deleted = True
            video.save(update_fields=['is_deleted'])
            return Response({"success": "Video was successfully deleted"}, status=HTTP_204_NO_CONTENT)

        except Video.DoesNotExist:
            return Response({"error": "Video does not exist"}, status=HTTP_404_NOT_FOUND)


# needed if user accesses /data/delete/ wihout params
class VideoOpNoIdView(GenericAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer # still needed to supress warning
    @extend_schema(
        operation_id="video_op_no_id",
        description="video operation without id"
    )
    def delete(self, request, *args, **kwargs):
        return Response({"error": "You must provide a valid id"}, status=HTTP_400_BAD_REQUEST)
