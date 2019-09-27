"""djangoreactproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from customers import views
from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/questions/$', views.question_list),
    url(r'^api/questions/(?P<pk>[0-9]+)$', views.question_individual),
    url(r'^api/sets/$', views.question_set_list),
    url(r'^api/sets/(?P<pk>[0-9]+)$', views.question_set_individual),
    url(r'^api/secure_sets/$', views.question_set_secure)
]
