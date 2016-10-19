from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /checklist/
    url(r'^$', views.index, name='index'),
    url(r'^instructions/$', views.instructions, name='instructions'),
    url(r'^questions/$', views.questions, name='questions'),        # read only question list

    # needs to be converted to react

    # answer review
    url(r'^oldreview/$'                       , views.review, name='oldreview'),
    # 3rd party answer review
    url(r'^oldview/(?P<user_id>[0-9]+)/$'     , views.view  , name='view'),

    url(r'^detail/(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # support for setting from detail page
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
