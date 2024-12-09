from django.urls import path
from . import views

urlpatterns = [
    path('', views.get),
    path('all_videos/', views.all_videos),
    path('add_video/', views.add_video),
    path('del_video/', views.del_video),
]

