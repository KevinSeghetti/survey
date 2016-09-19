from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /checklist/
    url(r'^$', views.index, name='index'),
    url(r'^instructions/$', views.instructions, name='instructions'),
    url(r'^questions/$', views.questions, name='questions'),        # read only question list

    # edit answers
    url(r'^edit/$', views.answers_react_edit, name='edit'),
    url(r'^resume/$', views.answers_react_resume, name='resume'),

    # needs to be converted to react

    # answer review
    url(r'^review/$'                       , views.review, name='review'),
    # 3rd party answer review
    url(r'^view/(?P<user_id>[0-9]+)/$'     , views.view  , name='view'),
    # in progress
    url(r'^reactreview/$'                  , views.reactreview, name='reactreview'),
    url(r'^reactview/(?P<user_id>[0-9]+)/$', views.reactview  , name='reactview'),

    url(r'^detail/(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # support for setting from detial page
    url(r'^set/$', views.set, name='set'),

    # question editor, not sure we should have this, backbone based
    url(r'^questions/edit/$', views.questions_edit, name='questions_edit'),


    # ajax back end

    # ajax interface for reading and writing answers
    url(r'^rest/questions$'          , views.rest_questions          , name='rest_questions'),
    url(r'^rest/questions_remaining$', views.rest_questions_remaining, name='rest_questions_remaining'),


    # incomplete or obsolete

    # backbone based answer editor, incomplete
    url(r'^answers/edit/$', views.answers_edit, name='answers_edit'),

]
