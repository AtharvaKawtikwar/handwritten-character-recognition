# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import NVDData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NVDDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = NVDData
        fields = '__all__'    