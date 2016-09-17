import pprint

from django.shortcuts import get_object_or_404, get_list_or_404,render
#from django.http import Http404
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.db.models import Count
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from rest_framework import (
    viewsets,
    permissions,
    status
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer


from django.http import HttpResponse
#from django.template import RequestContext, loader
from bdsm_checklist.settings import APP_NAME,SFW

from .models import Question,Answer
from .serializers import (
    QuestionSerializer,
    QuestionWithAnswerSerializer,
    AnswerSerializer,
    UserSerializer
)

def index(request):
    latest_question_list = Question.objects.order_by('-question_text')[:5]
    # this is a shortcut
    publish_url = ""
    publish_url_text =""
    if(request.user.is_authenticated() ):
        publish_url  = reverse('checklist:view',args=str(request.user.id))
        publish_url_text = request.get_host()+ publish_url

    context = {
        'publish_url': publish_url,
        'publish_url_text': publish_url_text,
    }
    return render(request, 'checklist/index.html', context)
    # for this

    #template = loader.get_template('checklist/index.html')
    #context = RequestContext(request, {
    #    'latest_question_list': latest_question_list,
    #})
    #return HttpResponse(template.render(context))

def instructions(request):
    return render(request, 'checklist/instructions.html')


choices = {}
choices['rating'] = \
[
    {"name":"na"        , "description":"N/A"         },
    {"name":"love"      , "description":"Love"        },
    {"name":"like"      , "description":"Like"        },
    {"name":"dont_mind" , "description":"Don't Mind"  },
    {"name":"dislike"   , "description":"Dislike"     },
    {"name":"hate"      , "description":"Hate"        },
]
if SFW:
    choices_context = \
    [
        {"name":'to_me'     , "description":'Do Myself'      },
        {"name":'to_others' , "description":'Watch Others Do' },
    ]

    choices['booleans'] = \
    [
        # kts eventually store this in a table
        {"name":'essential' , "description":'Essential' },
        {"name":'curious'   , "description":'Curious'   },
        #{"name":'soft_limit', "description":'Soft Limit'},
        #{"name":'hard_limit', "description":'Hard Limit'},
        {"name":'have_done' , "description":'Have Done' },
    ]

else:
    choices_context = \
    [
        {"name":'to_me'     , "description":'To/For Self'         },
        {"name":'to_others' , "description":'To/For Others' },
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

# kts above choices layout sucks, shoud be refactored
# in the meantime, here is how it ought to be laid out

choicesRatingDict = {x['name']:x['description'] for x in choices['rating']}

# edit a single answer. Linked from the review page
@login_required
def detail(request, question_id):
    # this shortcut
    question = get_object_or_404(Question, pk=question_id)
    # is the same as
    #try:
    #    question = Question.objects.get(pk=question_id)
    #except Question.DoesNotExist:
    #    raise Http404("Question does not exist")
    return render(request, 'checklist/detail.html', {
        'node': get_answers_list(request.user, [question])[0],
        'choices_context': choices_context,
        'choices': choices,
        'user' : request.user,
        })

def questions(request):
    question_list = Question.objects.order_by('-question_text')
    context = {'question_list': question_list}
    return render(request, 'checklist/questions.html', context)

def questions_edit(request):
    question_list = Question.objects.order_by('-question_text')
    context = {'question_list': question_list}
    return render(request, 'checklist/questions_edit.html', context)

#===============================================================================

@login_required
def answers_edit(request):
    answer_list = Answer.objects.order_by('-question__question_text')
    context = {'answer_list': answer_list}
    return render(request, 'checklist/answers_edit.html', context)

#===============================================================================

@login_required
def answers_react_edit(request):
    answer_list = Answer.objects.order_by('-question__question_text')

    context = {
        'choices_context': choices_context,
        'choices': choices,
        'user' : request.user,
        'questionsUrl': reverse('checklist:rest_questions')
    }

    return render(request, 'checklist/answers_react_edit.html', context)

#===============================================================================

@login_required
def answers_react_resume(request):
    answer_list = Answer.objects.order_by('-question__question_text')

    context = {
        'choices_context': choices_context,
        'choices': choices,
        'user' : request.user,
        'questionsUrl': reverse('checklist:rest_questions_remaining')
    }

    return render(request, 'checklist/answers_react_edit.html', context)

#===============================================================================

def get_answers_list (user, questions):
    print("get_answers_list: user = ",user)
    results = []
    for question in questions:
        node = {}
        results.append(node)
        node['question'] = question
        for context in choices_context:
            try:
                answer = Answer.objects.get(user=user,question=question,context=context['name'])
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

@login_required
def review(request):
    questions = get_list_or_404(Question)

    return render(request, 'checklist/view.html', {
        'questions': get_answers_list(request.user,questions), 
        'choices_context': choices_context, 
        'choices': choices,
        'choicesRatingDict': choicesRatingDict,
        'user' : request.user,
        })

def view(request,user_id):
    questions = get_list_or_404(Question)
    user = get_object_or_404(User,id=user_id)

    return render(request, 'checklist/view.html', {
        'questions': get_answers_list(user,questions),
        'choices_context': choices_context,
        'choices': choices,
        'choicesRatingDict': choicesRatingDict,
        'user' : user,
        })



@login_required
def reactreview(request):
    questions = get_list_or_404(Question)

    return render(request, 'checklist/reactview.html', {
        'questions': get_answers_list(request.user,questions),
        'choices_context': choices_context,
        'choices': choices,
        'choicesRatingDict': choicesRatingDict,
        'user' : request.user,
        })

def reactview(request,user_id):
    questions = get_list_or_404(Question)
    user = get_object_or_404(User,id=user_id)

    return render(request, 'checklist/reactwview.html', {
        'questions': get_answers_list(user,questions),
        'choices_context': choices_context,
        'choices': choices,
        'choicesRatingDict': choicesRatingDict,
        'user' : user,
        })

@login_required
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
                print(" selected_rating = ",selected_rating)
            except:
                # rating is required. If no rating, then don't create an
                # answer for this question.
                pass
            else:
                # ok, we have a rating, lets see if we can find an answer
                # to update

                try:
                    answer = Answer.objects.get(user=request.user,question=question,context=context['name'])
                except:
                    print("@@ creating new answer for ",question.id,":",context['name'])
                    answer = Answer(user=request.user,question=question,context=context['name'])

                answer.rating = selected_rating

                notes_field_name = str(question.id)+"_"+context['name']+'_notes'
                print("notes field name = ",notes_field_name)
                try:
                    value = request.POST[notes_field_name]
                except:
                    # text field not found
                    pass
                else:
                    answer.notes = value

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


#===============================================================================

class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows questions to be viewed or edited.
    """

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Question.objects.all().order_by('-question_text')
    serializer_class = QuestionSerializer

#===============================================================================

class QuestionWithAnswerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows questions to be viewed or edited.
    """

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    #queryset = Question.objects.all().order_by('-question_text')
    queryset = Answer.objects.all()
    serializer_class = QuestionWithAnswerSerializer

#===============================================================================

class AnswerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows answers to be viewed or edited.
    """
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Answer.objects.all().order_by('-question__question_text')
    #def get_queryset(self):
    #    """
    #    This view should return a list of all the purchases
    #    for the currently authenticated user.
    #    """
    #    user = self.request.user
    #    return Answer.objects.filter(user=user).order_by('-question__question_text')

    serializer_class = AnswerSerializer

    def perform_create(self, serializer):
        questionId =   self.request.data.get('question[id]')
        print("question id")
        pprint.pprint(questionId)
        question = Question.objects.get(id=questionId)
        serializer.save(question=question,user=self.request.user)

    def perform_update(self, serializer):
        questionId =   self.request.data.get('question[id]')
        #print("question id")
        pprint.pprint(serializer)
        question = Question.objects.get(id=questionId)
        serializer.save(question=question,user=self.request.user)

#===============================================================================

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

#===============================================================================

def get_rest_answers_list (request, user, questions):
    print("get_rest_answers_list: user = ",user)
    results = []
    for question in questions:
        node = {}
        results.append(node)
        node['question'] = QuestionSerializer(question,context={'request':request}).data
        #data = QuestionSerializer(question,context={'request':request}).data
        #pprint.pprint({"data":data})
        #json = JSONRenderer().render(data)
        #pprint.pprint({"json":json})

        for context in choices_context:
            try:
                answer = Answer.objects.get(user=user,question=question,context=context['name'])
            except:
                # not found, don't bother setting
                pass
            else:
                if 'answers' not in node:
                    node['answers'] = {}

                #data = AnswerSerializer(answer,context={'request':request}).data
                #pprint.pprint({"data":data})
                #json = JSONRenderer().render(data)
                #pprint.pprint({"json":json})

                node['answers'][context["name"]] = AnswerSerializer(answer,context={'request':request}).data
    #print("get_rest_answerslist: results:")
    #pprint.pprint(results)

    return results

@login_required
@api_view(['GET', 'POST'])
def rest_questions(request):
    questions = get_list_or_404(Question)
    results = get_rest_answers_list(request, request.user, questions)
    print("rest_questions: results:")
    pprint.pprint(results)

    return Response({ 'results' :results} )


@login_required
@api_view(['GET', 'POST'])
def rest_questions_remaining(request):

    questions = Question.objects.exclude(
       id__in=Question.objects.annotate(num_answers=Count('answer')).filter(answer__user=request.user, num_answers__gt=3)
    )

    results = get_rest_answers_list(request, request.user, questions)
    print("rest_questions: results:")
    pprint.pprint(results)

    return Response({ 'results' :results} )

