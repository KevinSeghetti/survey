from rest_framework import serializers
from django.contrib.auth.models import User
from checklist.models import Question, Answer



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')


class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'url','question_text', 'question_detail',)

class AnswerSerializer(serializers.HyperlinkedModelSerializer):

    question = QuestionSerializer(read_only=True)
#    question = serializers.HyperlinkedRelatedField(
#        many=False,
#        read_only=True,
#        view_name='question-detail'
#    )

    user = serializers.HyperlinkedRelatedField(
    #user = serializers.PrimaryKeyRelatedField(
        many=False,
        read_only=True,
        view_name='user-detail'
    )

    class Meta:
        model = Answer
        fields = (
            'id',
            'url',
            'user',
            'question',
            'context',
            'essential',
            'curious',
            'soft_limit',
            'hard_limit',
            'have_done',
            'rating',
            'notes',
        )



