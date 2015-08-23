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
    essential = models.BooleanField()
    curious = models.BooleanField()
    soft_limit = models.BooleanField()
    hard_limit = models.BooleanField()
    have_done = models.BooleanField()
    rating = models.IntegerField()
    
    def __str__(self):              # __unicode__ on Python 2
        return (
          "Answer: essential:{}, curious:{},soft_limit:{},hard_limit:{},have_done:{},rating:{}"
          .format(self.essential,self.curious,self.soft_limit,self.hard_limit,self.have_done,self.rating)
        )

