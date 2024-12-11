from django.urls import path
from .views import login, AuthorSignupCreateView, AuthorLogoutCreateView

app_name = 'data_api_app'

urlpatterns = [
    # path('signup/', views.signup),
    path('login/', login),
    # path('logout/', logout),
    
    # class update
    path('signup/', AuthorSignupCreateView.as_view(), name='author_signup'),
    path('logout/', AuthorLogoutCreateView.as_view(), name='author_logout'),
]
