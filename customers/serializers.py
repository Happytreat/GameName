from rest_framework import serializers
from .models import Customer, Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('pk', 'position', 'question')


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer 
        fields = ('pk', 'first_name', 'last_name', 'email', 'phone', 'address', 'description')
