
import reducer from 'topReducerAnswerEditor'
import {
    contextBooleanFilterReducer,
    contextRatingFilterReducer,
    filterReducer
    } from 'filterReducers'
import * as types from 'constants/actionTypes';
import {
    ACTION_TOGGLE_BOOLEAN_FILTER,
    ACTION_TOGGLE_RATING_FILTER,
    ACTION_CLEAR_BOOLEAN_FILTER,
    ACTION_CLEAR_RATING_FILTER,
    ACTION_SET_SEARCH_STRING
    } from 'actionTypesAnswerViewer'

// cannot currently override applicationData defaults found in applicationData.js

//global.window.globs['choices'] = {"rating": [{"name": "na", "description": "N/A"}, {"name": "love", "description": "Love"}, {"name": "like", "description": "Like"}, {"name": "dont_mind", "description": "Don't Mind"}, {"name": "dislike", "description": "Dislike"}, {"name": "hate", "description": "Hate"}], "booleans": [{"name": "essential", "description": "Essential"}, {"name": "curious", "description": "Curious"}, {"name": "soft_limit", "description": "Soft Limit"}, {"name": "hard_limit", "description": "Hard Limit"}, {"name": "have_done", "description": "Have Done"}]}
//global.window.globs['choices_context'] = [{"name": "to_me", "description": "To/For Self"}, {"name": "to_others", "description": "To/For Others"}]
//global.window.globs['csrfToken'] = "csrf_token"
//global.window.globs['defaultLoggingLevel'] = "OFF"

//var loggingLevel='ERROR'    // 'ALL'
//window.globs = []
//window.globs['defaultLoggingLevel'] = "WARNING"
//
//window.globs['loggingLevels'] =
//{
//    'AnswerView' : loggingLevel,
//    //'viewerComponents' : loggingLevel,
//    'answers_view' : loggingLevel,
//    'actions' : loggingLevel,
//    'reducers' : loggingLevel,
//}
//window.globs['questionsUrl'] = "questionsUrl"

describe('contextBooleanFilterReducer',() => {
    it('should return initial state', () => {

        var result = contextBooleanFilterReducer(undefined, { type: '@@INIT' } )

        expect(
          contextBooleanFilterReducer(undefined, { type: '@@INIT' } )
        ).toEqual(
            {}
        )
    }
    )

    it('should set a rating', () => {
        let input =
        {
            "essential": true,
            "curious": true,
            "soft_limit": true,
            "hard_limit": true,
            "have_done": true
          }
        let action =
        {
            type: ACTION_TOGGLE_BOOLEAN_FILTER,
            id: 'have_done'

        }
        let output = contextBooleanFilterReducer(input,action)
        expect(output).toEqual(
              {
                "essential": true,
                "curious": true,
                "soft_limit": true,
                "hard_limit": true,
                "have_done": false
              }
            )

    })

}
)


describe('contextRatingFilterReducer', () => {
    it('should return initial state', () => {
        var result = contextRatingFilterReducer(undefined, { type: '@@INIT' } )

        expect(
          contextRatingFilterReducer(undefined, { type: '@@INIT' } )
        ).toEqual(
            {}
        )
    }
    )


});

