from django.contrib import admin

# Register your models here.

from django.contrib import admin

from .models import Question, Answer


class QuestionAdmin(admin.ModelAdmin):
#    fieldsets = [
#        (None,               {'fields': ['question_text']}),
#        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
#    ]
    list_display = ('question_text', 'question_detail')
    search_fields = ['question_text']


class AnswerAdmin(admin.ModelAdmin):
#    fieldsets = [
#        (None,               {'fields': ['question_text']}),
#        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
#    ]
    list_filter = (
        'question'      ,
        'context'      ,
        'rating'       ,
        'essential'    ,
        'curious'      ,
        'soft_limit'   ,
        'hard_limit'   ,
        'have_done'    ,
    )
    list_display = list_filter
        
    search_fields = ['rating']

admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
