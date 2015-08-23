from django.shortcuts import get_object_or_404, render
#from django.http import Http404

# Create your views here.

from django.http import HttpResponse
#from django.template import RequestContext, loader
from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by('-question_text')[:5]
    # this is a shortcut
    context = {'latest_question_list': latest_question_list}
    return render(request, 'checklist/index.html', context)
    # for this

    #template = loader.get_template('checklist/index.html')
    #context = RequestContext(request, {
    #    'latest_question_list': latest_question_list,
    #})
    #return HttpResponse(template.render(context))

def detail(request, question_id):
    # this shortcut
    question = get_object_or_404(Question, pk=question_id)
    # is the same as
    #try:
    #    question = Question.objects.get(pk=question_id)
    #except Question.DoesNotExist:
    #    raise Http404("Question does not exist")
    choices = {}
    choices['rating'] = range(1,5+1)
    choices['booleans'] = \
    [
        # kts eventually store this in a table
        {"name":'essential' , "description":'Essential' },
        {"name":'curious'   , "description":'Curious'   },
        {"name":'soft_limit', "description":'Soft Limit'},
        {"name":'hard_limit', "description":'Hard Limit'},
        {"name":'have_done' , "description":'Have Done' },
    ]
    choices_context = \
    [
        {"prefix":'done_to'   , "description":'Done to you'         },
        {"prefix":'have_done' , "description":'Have done to others' },
    ]
    return render(request, 'checklist/detail.html', {'question': question, 'choices_context': choices_context, 'choices': choices})



def view(request):
    return HttpResponse("You're looking at checklist results")

def fill_out(request):
    response = "You're looking at filling out checklist."
    return HttpResponse(response)

