from checklist.models import Question, Answer
from rest_framework import serializers


class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ('question_text', 'question_detail',)

class AnswerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Answer
        fields = ('curious', 'essential',)



