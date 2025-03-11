from django.urls import path
from .views import RegisterView, LoginView, RefreshTokenView
from .views import NVDDataListView  # Import the view


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', RefreshTokenView.as_view(), name='refresh'),
    path('nvd-data/', NVDDataListView.as_view(), name='nvd-data'),
]