//var $ = require('jquery');

import {topReducer,questionReducer} from 'topReducerAnswerEditor'
import {navigationReducer} from 'navigationReducers'

import  contextBooleanFilterReducer  from 'filterReducers'
import * as types from 'constants/actionTypes'

import {
    setField
    } from 'constants/actionTypes'


 import {
    moveCursorAction
} from 'actionTypesAnswerEditor'



//import {
//    ACTION_LOAD,
//    ACTION_LOAD_SINGLE_ANSWER,
//    ACTION_MOVE_CURSOR,
//    ACTION_SET_ANSWER_FIELD,
//    ACTION_NEXT_UNANSWERED_QUESTION,
//    } from 'actionTypesAnswerEditor'
//import {
//    loadAction,
//    loadSingleAnswerAction,
//    oggleBooleanFilterAction,
//    oggleRatingFilterAction
//    } from 'actionTypesAnswerEditor'

describe('topReducer', () => {
  it('should return the initial state', () => {
    expect(
      topReducer(undefined, { type: '@@INIT' } )
    ).toEqual(
        {"questions":[],"navigation":{"currentQuestion":0}}
    )
  })

  it('should set an answer field', () => {
      let input =
      [{"question":{"id":1,"url":"http://localhost:8000/rest/questions/1/","question_text":"Anal Play","question_detail":"Acts in which the anus is involved."},"answers":{"to_me":{"id":1,"url":"http://localhost:8000/rest/answers/1/","user":"http://localhost:8000/rest/users/1/","question":{"id":1,"url":"http://localhost:8000/rest/questions/1/","question_text":"Anal Play","question_detail":"Acts in which the anus is involved."},"context":"to_me","essential":false,"curious":false,"soft_limit":false,"hard_limit":false,"have_done":true,"rating":"like","notes":""}}},
       {"question":{"id":2,"url":"http://localhost:8000/rest/questions/2/","question_text":"Beating (General)","question_detail":"Acts in which one partner is beaten."}},
       {"question":{"id":3,"url":"http://localhost:8000/rest/questions/3/","question_text":"Beating - Canes","question_detail":"Acts in which one partner is beaten with a cane."}},
       {"question":{"id":4,"url":"http://localhost:8000/rest/questions/4/","question_text":"Beating - Crops","question_detail":"Acts in which one partner is beaten with a crop."}}
      ]

      let action = setField(1, 'to_me', 'essential', true)
      let output = questionReducer(input,action)
      expect(output).toEqual(

          [{"question":{"id":1,"url":"http://localhost:8000/rest/questions/1/","question_text":"Anal Play","question_detail":"Acts in which the anus is involved."},"answers":{"to_me":{"id":1,"url":"http://localhost:8000/rest/answers/1/","user":"http://localhost:8000/rest/users/1/","question":{"id":1,"url":"http://localhost:8000/rest/questions/1/","question_text":"Anal Play","question_detail":"Acts in which the anus is involved."},"context":"to_me","essential":true,"curious":false,"soft_limit":false,"hard_limit":false,"have_done":true,"rating":"like","notes":""}}},
           {"question":{"id":2,"url":"http://localhost:8000/rest/questions/2/","question_text":"Beating (General)","question_detail":"Acts in which one partner is beaten."}},
           {"question":{"id":3,"url":"http://localhost:8000/rest/questions/3/","question_text":"Beating - Canes","question_detail":"Acts in which one partner is beaten with a cane."}},
           {"question":{"id":4,"url":"http://localhost:8000/rest/questions/4/","question_text":"Beating - Crops","question_detail":"Acts in which one partner is beaten with a crop."}}
          ]
      )

  })



});

describe('navigationReducer', () => {
  it('should return the initial state', () => {
    expect(
      navigationReducer(undefined, { type: '@@INIT' } )
    ).toEqual(
        {"currentQuestion":0}
    )
  })

  it('should move the cursor', () => {
      let input =
          {"currentQuestion":0}
      let questions =
      [{"question":{"id":1,"url":"http://localhost:8000/rest/questions/1/","question_text":"Anal Play","question_detail":"Acts in which the anus is involved."},"answers":{"to_me":{"id":1,"url":"http://localhost:8000/rest/answers/1/","user":"http://localhost:8000/rest/users/1/","question":{"id":1,"url":"http://localhost:8000/rest/questions/1/","question_text":"Anal Play","question_detail":"Acts in which the anus is involved."},"context":"to_me","essential":false,"curious":false,"soft_limit":false,"hard_limit":false,"have_done":true,"rating":"like","notes":""}}},
       {"question":{"id":2,"url":"http://localhost:8000/rest/questions/2/","question_text":"Beating (General)","question_detail":"Acts in which one partner is beaten."}},
       {"question":{"id":3,"url":"http://localhost:8000/rest/questions/3/","question_text":"Beating - Canes","question_detail":"Acts in which one partner is beaten with a cane."}},
       {"question":{"id":4,"url":"http://localhost:8000/rest/questions/4/","question_text":"Beating - Crops","question_detail":"Acts in which one partner is beaten with a crop."}}
      ]

      let action = moveCursorAction(1)
      let output = navigationReducer(input,action,questions)
      expect(output).toEqual(
          {"currentQuestion":1}
      )

  })



});




//global.window.globs['choices'] = {"rating": [{"name": "na", "description": "N/A"}, {"name": "love", "description": "Love"}, {"name": "like", "description": "Like"}, {"name": "dont_mind", "description": "Don't Mind"}, {"name": "dislike", "description": "Dislike"}, {"name": "hate", "description": "Hate"}], "booleans": [{"name": "essential", "description": "Essential"}, {"name": "curious", "description": "Curious"}, {"name": "soft_limit", "description": "Soft Limit"}, {"name": "hard_limit", "description": "Hard Limit"}, {"name": "have_done", "description": "Have Done"}]}
//global.window.globs['choices_context'] = [{"name": "to_me", "description": "To/For Self"}, {"name": "to_others", "description": "To/For Others"}]
//global.window.globs['csrfToken'] = "csrf_token"
//global.window.globs['defaultLoggingLevel'] = "OFF"
//var loggingLevel='ERROR'    // 'ALL'
//window.globs['loggingLevels'] =
//{
//    'AnswerView' : loggingLevel,
//    //'viewerComponents' : loggingLevel,
//    'answers_view' : loggingLevel,
//    'actions' : loggingLevel,
//    'reducers' : loggingLevel,
//}
//window.globs['questionsUrl'] = "questionsUrl"
//

