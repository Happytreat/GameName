# Generated by Django 2.2.5 on 2019-09-22 15:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0002_customers'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=255, verbose_name='Author ID')),
                ('title', models.CharField(max_length=255, verbose_name='Set Title')),
                ('description', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255, verbose_name='Question')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('set', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='customers.QuestionSet')),
            ],
        ),
    ]
