from django.urls import path
from django.http import JsonResponse
from .views import *

app_name = 'data_api_app'

urlpatterns = [

    # class based
    path('list/', VideoListView.as_view(), name='video_list'),
    path('list/<int:video_id>/', VideoRetrieveView.as_view(), name='video_detail'),
    path('add/', VideoAddView.as_view(), name='video_add'),
    path('delete/<int:video_id>', VideoDeleteView.as_view(), name='video_delete'),
    path('delete/', VideoOpNoIdView.as_view(), name='video_delete_no_id'), # needed for friendly error
    path('update/<int:video_id>', VideoUpdateView.as_view(), name='video_update'),
    path('update/', VideoUpdateView.as_view(), name='video_update_no_id'), # needed for friendly error
]
