from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /checklist/
    url(r'^$', views.index, name='index'),
    # ex: /polls/5/
    url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /checklist/view/
    url(r'^view/$', views.view, name='view'),
    # ex: /checklist/fill_out/
    url(r'^fill_out/$', views.fill_out, name='fill_out'),

]
