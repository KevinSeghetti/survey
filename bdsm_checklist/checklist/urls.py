from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /checklist/
    url(r'^$', views.index, name='index'),
    # ex: /checklist/instructions
    url(r'^instructions/$', views.instructions, name='instructions'),
    # ex: /polls/5/
    url(r'^detail/(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /checklist/questions/
    url(r'^questions/$', views.questions, name='questions'),
    url(r'^questions/edit/$', views.questions_edit, name='questions_edit'),
    url(r'^questions/edit/(?P<question_id>[0-9]+)/$', views.question_edit, name='question_edit'),

    url(r'^answers/edit/$', views.answers_edit, name='answers_edit'),


    url(r'^edit/$', views.answers_react_edit, name='edit'),
    #url(r'^edit/$', views.edit, name='edit'),
    #url(r'^answers_react/edit/$', views.answers_react_edit, name='answers_react_edit'),


    url(r'^rest/questions$', views.rest_questions, name='rest_questions'),
    url(r'^resume/$', views.resume, name='resume'),
    # ex: /checklist/edit/unanswered
    #url(r'^edit/(?P<option>[\w\d])+/$', views.edit, name='edit_with_option'),
    # ex: /checklist/view/
    url(r'^review/$', views.review, name='review'),
    url(r'^view/(?P<user_id>[0-9]+)/$', views.view, name='view'),
    # ex: /checklist/set/
    url(r'^set/$', views.set, name='set'),

]
