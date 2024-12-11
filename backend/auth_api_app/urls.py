from django.urls import path
from . import views

app_name = 'data_api_app'

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('logout/', views.logout),
]