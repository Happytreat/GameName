from rest_framework import serializers
from .models import Customer, Question, QuestionSet


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('pk', 'set', 'position', 'question')


class QuestionSerializerNoSetNoPosition(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('pk', 'question')


class QuestionSetSerializer(serializers.ModelSerializer):
    questions = QuestionSerializerNoSetNoPosition(many=True)

    class Meta:
        model = QuestionSet
        fields = ('pk', 'author', 'title', 'questions')

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        set = QuestionSet.objects.create(**validated_data)
        for position, question_data in enumerate(questions_data):
            Question.objects.create(set=set, position=position+1, **question_data)
        return set


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('pk', 'first_name', 'last_name', 'email', 'phone', 'address', 'description')
