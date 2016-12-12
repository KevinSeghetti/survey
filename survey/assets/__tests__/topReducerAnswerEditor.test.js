//var $ = require('jquery');

import reducer from 'topReducerAnswerEditor'
import  contextBooleanFilterReducer  from 'filterReducers'
import * as types from 'constants/actionTypes';

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
      reducer(undefined, { type: '@@INIT' } )
    ).toEqual(
        {"questions":[],"navigation":{"currentQuestion":0}}
    )
  })



  it('should return the initial state', () => {
    expect(
      reducer(undefined, { type: '@@INIT' } )
    ).toEqual(
        {"questions":[],"navigation":{"currentQuestion":0}}
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
test('contentRatingFilterReducer', () => {
//
//  let input =
//  {
//      "essential": true,
//      "curious": true,
//      "soft_limit": true,
//      "hard_limit": true,
//      "have_done": true
//    }
//  let action =
//  {
//      type: ACTION_TOGGLE_BOOLEAN_FILTER,
//      id: 'have_done'
//
//  }
//  let output = contextBooleanFilterReducer(input,action)
//  expect(ouput).toEqual(
//        {
//          "essential": true,
//          "curious": true,
//          "soft_limit": true,
//          "hard_limit": true,
//          "have_done": false
//        }
//      )
});

