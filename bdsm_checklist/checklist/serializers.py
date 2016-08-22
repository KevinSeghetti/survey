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
        fields = (
            'id',
            'url',
            'question_text',
            'question_detail',
        )

class AnswerSerializer(serializers.HyperlinkedModelSerializer):

    question = QuestionSerializer(read_only=True)
    user = serializers.HyperlinkedRelatedField(
        many=False,
        read_only=True,
        view_name='user-detail'
    )
    #user = serializers.PrimaryKeyRelatedField(read_only=True,)

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



class QuestionWithAnswerSerializer(serializers.Serializer):
    #user     = serializers.ForeignKey(User)
    #question = serializers.ForeignKey(Question)
    context = serializers.CharField()       # enum, should only contained to_me, to_others

    essential  = serializers.BooleanField()
    curious    = serializers.BooleanField()
    soft_limit = serializers.BooleanField()
    hard_limit = serializers.BooleanField()
    have_done  = serializers.BooleanField()
    rating     = serializers.CharField()
    notes      = serializers.CharField()

    unrelated  = serializers.BooleanField()


    def restore_object(self, attrs, instance=None):
        """
        Given a dictionary of deserialized field values, either update
        an existing model instance, or create a new model instance.
        """
        if instance is not None:
            instance.essential    = attrs.get('essential'  , instance.essential )
            instance.curious      = attrs.get('curious'    , instance.curious   )
            instance.soft_limit   = attrs.get('soft_limit' , instance.soft_limit)
            instance.hard_limit   = attrs.get('hard_limit' , instance.hard_limit)
            instance.have_done    = attrs.get('have_done'  , instance.have_done )
            instance.rating       = attrs.get('rating'     , instance.rating    )
            instance.notes        = attrs.get('notes'      , instance.notes     )
            return instance
        return Question(**attrs)




