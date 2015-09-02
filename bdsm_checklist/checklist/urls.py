from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /checklist/
    url(r'^$', views.index, name='index'),
    # ex: /checklist/instructions
    url(r'^instructions/$', views.instructions, name='instructions'),
    # ex: /polls/5/
    url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /checklist/questions/
    url(r'^questions/$', views.questions, name='questions'),
    # ex: /checklist/edit/
    url(r'^edit/$', views.edit, name='edit'),
    url(r'^resume/$', views.resume, name='resume'),
    # ex: /checklist/edit/unanswered
    #url(r'^edit/(?P<option>[\w\d])+/$', views.edit, name='edit_with_option'),
    # ex: /checklist/view/
    url(r'^review/$', views.review, name='review'),
    url(r'^view/(?P<user_id>[0-9]+)/$', views.view, name='view'),
    # ex: /checklist/set/
    url(r'^set/$', views.set, name='set'),

]
