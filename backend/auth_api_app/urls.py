from django.urls import path
from .views import AuthorSignupCreateView, AuthorLogoutCreateView, AuthorLoginCreateView, AuthorRetrieveView

app_name = 'data_api_app'

urlpatterns = [
    # class update
    path('signup/', AuthorSignupCreateView.as_view(), name='author_signup'),
    path('logout/', AuthorLogoutCreateView.as_view(), name='author_logout'),
    path('login/', AuthorLoginCreateView.as_view(), name='author_login'),
    
    path('authors/<str:username>', AuthorRetrieveView.as_view(), name='author_detail'),
]
