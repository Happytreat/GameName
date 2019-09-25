from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Customer, Question, QuestionSet
from .serializers import *
import json


@api_view(['POST'])
def question_set_secure(request):
    """
    Securely retrieve a question or a list of questions; only send if the author token is correct.
    """
    if "pk" in json.loads(request.body).keys():
        # One question by an author.
        try:
            pk = json.loads(request.body)["pk"]
            author = json.loads(request.body)["author"]
            question_set = QuestionSet.objects.filter(author=author).get(pk=pk)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except QuestionSet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = QuestionSetSerializer(question_set, context={'request': request})
        return Response(serializer.data)
    else:
        # List of questions by an author.
        try:
            author = json.loads(request.body)["author"]
            question_set = QuestionSet.objects.filter(author=author)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if not question_set:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = QuestionSetSerializer(question_set, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def question_list(request):
    """
    GET: List all questions.
    POST: Create a new question.
    """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        questions = Question.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(questions, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = QuestionSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/questions/?page=' + str(nextPage),
                         'prevlink': '/api/questions/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def question_individual(request, pk):
    """
    Retrieve, update or delete a question by id/pk.
    """
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestionSerializer(question, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = QuestionSerializer(question, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def question_list(request):
    """
    GET: List all questions.
    POST: Create a new question.
    """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        questions = Question.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(questions, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = QuestionSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/questions/?page=' + str(nextPage),
                         'prevlink': '/api/questions/?page=' + str(previousPage)})
    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def question_set_individual(request, pk):
    """
    Retrieve, update or delete a question set by id/pk.
    """
    try:
        question_set = QuestionSet.objects.get(pk=pk)
    except QuestionSet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestionSetSerializer(question_set,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = QuestionSetSerializer(question_set, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        question_set.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def question_set_list(request):
    """
    GET: List all question sets along with their corresponding questions.
    POST: Create a new set of questions.
    """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        sets = QuestionSet.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(sets, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = QuestionSetSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/sets/?page=' + str(nextPage),
                         'prevlink': '/api/sets/?page=' + str(previousPage)})
    if request.method == 'POST':
        serializer = QuestionSetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

