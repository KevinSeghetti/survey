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
    "Love"        ,
    "Like"        ,
    "Don't Mind"  ,
    "Dislike"     ,
    "Hate"        ,
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
    {"name":'to_me'     , "description":'To/For Self'         },
    {"name":'to_others' , "description":'To/For Others' },
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

def questions(request):
    question_list = Question.objects.order_by('-question_text')
    context = {'question_list': question_list}
    return render(request, 'checklist/questions.html', context)

def get_answers_list (questions):
    results = []
    for question in questions:
        node = {}
        results.append(node)
        node['question'] = question
        for context in choices_context:
            try:
                answer = Answer.objects.get(question=question,context=context['name'])
            except:
                # not found, don't bother setting
                pass
            else:
                if 'answers' not in node:
                    node['answers'] = {}
                node['answers'][context["name"]] = answer
    #print("answer list results")
    #pprint.pprint(results)
    return results

def view(request):
    questions = get_list_or_404(Question)

    return render(request, 'checklist/view.html', {
        'questions': get_answers_list(questions), 
        'choices_context': choices_context, 
        'choices': choices
        })

def edit(request):
    questions = get_list_or_404(Question)

    return render(request, 'checklist/edit.html', {
        'questions': get_answers_list(questions), 
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
            rating_field_name = str(question.id)+"_"+context['name']+'_rating'
            print("rating field name = ",rating_field_name)

            try:
                selected_rating = request.POST[rating_field_name]
            except:
                # rating is required. If no rating, then don't create an
                # answer for this question. 
                pass
            else:
                # ok, we have a rating, lets see if we can find an answer 
                # to update

                try:
                    answer = Answer.objects.get(question=question,context=context['name'])
                except:
                    print("@@ creating new answer for ",question.id,":",context['name'])
                    answer = Answer(question=question,context=context['name'])

                answer.rating = selected_rating

                # now grab any booleans which are set        
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
                
                print("About to write to answer:")
                pprint.pprint(answer)
                answer.save()
                    # Always return an HttpResponseRedirect after successfully dealing
                    # with POST data. This prevents data from being posted twice if a
                    # user hits the Back button.
    return HttpResponseRedirect(reverse('checklist:index'))


