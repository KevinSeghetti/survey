from django.shortcuts import get_object_or_404, get_list_or_404,render
#from django.http import Http404
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
import pprint
# Create your views here.

from django.http import HttpResponse
#from django.template import RequestContext, loader
from .models import Question,Answer

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

choices = {}
choices['rating'] = \
[
    {"name":"5", "description":"Love",        },
    {"name":"4", "description":"Like",        },
    {"name":"3", "description":"Don't Mind",  },
    {"name":"2", "description":"Dislike",     },
    {"name":"1", "description":"Hate"         },
]
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
    {"name":'to_me'     , "description":'Done to you'         },
    {"name":'to_others' , "description":'Have done to others' },
]

def detail(request, question_id):
    # this shortcut
    question = get_object_or_404(Question, pk=question_id)
    # is the same as
    #try:
    #    question = Question.objects.get(pk=question_id)
    #except Question.DoesNotExist:
    #    raise Http404("Question does not exist")
    return render(request, 'checklist/detail.html', {'question': question, 'choices_context': choices_context, 'choices': choices})


def view(request):
    return HttpResponse("You're looking at checklist results")

def edit(request):
    questions = get_list_or_404(Question)
    answerslist = {}
    for context in choices_context:
        for question in questions:
            try:
                answer = Answer.objects.get(question=question,context=context['name'])
            except:
                print("@@ creating new answer for ",question.id,":",context['name'])
                answer = Answer(question=question,context=context['name'])
                print("creating new answer so we can get defaults")
                pprint.pprint(answer)

            for item in choices['booleans']:
                answerslist[str(question.id)+"_"+context["name"]+"_"+item["name"]] = getattr(answer,item["name"])
    print("answer list")
    pprint.pprint(answerslist)

    return render(request, 'checklist/edit.html', {
        'questions': questions, 
        'answers': answerslist, 
        'choices_context': choices_context, 
        'choices': choices
        })

def set(request):
    questions = get_list_or_404(Question)
    print("---- set!!")
    for question in questions:
        print("question id = ",question.id)
        for context in choices_context:
            print("  context = ",context['name'])
            try:
                answer = Answer.objects.get(question=question,context=context['name'])
            except:
                print("@@ creating new answer for ",question.id,":",context['name'])
                answer = Answer(question=question,context=context['name'])
                print("creating new answer")
            print("About to write to answer:")
            pprint.pprint(answer)
            field_name = str(question.id)+"_"+context['name']+'_rating'
            print("field name = ",field_name)
            try:
                selected_rating = request.POST[field_name]
            except:
                # Redisplay the question voting form.
                return render(request, 'checklist/edit.html', {
                    'questions': questions, 
                    'choices_context': choices_context, 
                    'choices': choices,
                    'error_message': "You didn't select a rating.",
                })
            else:
                answer.rating = selected_rating

            for item in choices['booleans']:
                field_name = str(question.id)+"_"+context["name"]+"_"+item["name"] 
                print("checking for field named ",field_name)
                try:
                    value = request.POST[field_name]
                except:
                    # For booleans, not be fould just means it wasn't clicked
                    setattr(answer,item["name"],False)
                else:
                    setattr(answer,item["name"],True)
                                

                answer.save()
                # Always return an HttpResponseRedirect after successfully dealing
                # with POST data. This prevents data from being posted twice if a
                # user hits the Back button.
    return HttpResponseRedirect(reverse('checklist:index'))


