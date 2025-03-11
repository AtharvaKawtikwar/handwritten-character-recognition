from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Simple view for the root path
def index(request):
    return HttpResponse("API is running. Use /api/ for endpoints.")

urlpatterns = [
    path('', index, name='index'),  # Add this for the root path
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]