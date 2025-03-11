from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import generics
from .models import NVDData
from .serializers import NVDDataSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(TokenObtainPairView):
    pass

class RefreshTokenView(TokenRefreshView):
    pass

class NVDDataListView(generics.ListAPIView):
    queryset = NVDData.objects.all()  # Ensure the model is imported
    serializer_class = NVDDataSerializer