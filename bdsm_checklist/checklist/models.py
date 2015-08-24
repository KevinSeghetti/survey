from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    question_detail = models.CharField(max_length=500,blank=True)
    def __str__(self):              # __unicode__ on Python 2
        return self.question_text

# answers apply to all questions
class Answer(models.Model):
    # kts map to user here
    question = models.ForeignKey(Question)
    CONTEXT_CHOICES = (
    ('to_me', 'Done to me'),
    ('to_others', 'I have done to others'),
)
    context = models.CharField(choices = CONTEXT_CHOICES, max_length=10)       # enum, should only contained to_me, to_others

    essential = models.BooleanField(default=False)
    curious = models.BooleanField(default=False)
    soft_limit = models.BooleanField(default=False)
    hard_limit = models.BooleanField(default=False)
    have_done = models.BooleanField(default=False)
    rating = models.IntegerField(default=False)
    
    def __str__(self):              # __unicode__ on Python 2
        return (
          "Answer: context:{},essential:{}, curious:{},soft_limit:{},hard_limit:{},have_done:{},rating:{}"
          .format(self.context,self.essential,self.curious,self.soft_limit,self.hard_limit,self.have_done,self.rating)
        )

