from django.db import models


class QuestionSet(models.Model):
    author = models.CharField("Author ID", max_length=255)
    title = models.CharField("Set Title", max_length=255)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    set = models.ForeignKey(QuestionSet, related_name='questions', on_delete=models.CASCADE)
    position = models.IntegerField()
    question = models.CharField("Question", max_length=255)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.question


class Customer(models.Model):
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.first_name