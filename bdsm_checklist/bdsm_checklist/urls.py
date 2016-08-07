"""bdsm_checklist URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from rest_framework import routers
from django.contrib import admin
from django.views.generic import RedirectView

from checklist import views


router = routers.DefaultRouter()
router.register(r'questions', views.QuestionViewSet)
router.register(r'answers', views.AnswerViewSet)
router.register(r'users', views.UserViewSet)


#from registration.backends.simple.views import RegistrationView
#class MyRegistrationView(RegistrationView):
#        def get_success_url(self, request, user):
#            return '/checklist/'

urlpatterns = [
   url(r'^$', RedirectView.as_view(url='checklist')),
   url(r'^admin/', include(admin.site.urls)),
   url(r'^checklist/', include('checklist.urls',namespace="checklist")),
   url(r'^accounts/', include('registration.backends.simple.urls')),
#   url(r'^$', 'checklist.views.index', name='index'),
   url(r'^checklist/$', 'checklist.views.index', name='registration_complete'),
   url(r'^rest/', include(router.urls)),
   url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

]
