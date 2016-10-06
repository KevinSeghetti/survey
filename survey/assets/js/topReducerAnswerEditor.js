//===============================================================================
// top level state reducer for the answer editor

var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")

var {choices, choices_context} = require('./applicationData')
import {
    ACTION_LOAD,
        ACTION_PREV_QUESTION,
        ACTION_NEXT_QUESTION,
    } from './actionTypesAnswerEditor'
import {
    loadAction,
    oggleBooleanFilterAction,
    oggleRatingFilterAction
    } from './actionTypesAnswerEditor'
import { mapObject, defaultDict } from './utilities'
import { filterReducer } from './filterReducers'

//===============================================================================


const initialState = {
    questions: [],
    currentQuestion: 0,
}

//-------------------------------------------------------------------------------

export function topReducer(state = initialState, action) {

    log.trace("topReducer: ",JSON.stringify(action,null,2))
    switch (action.type) {
    case ACTION_LOAD:

        return Object.assign({}, state, {
            questions: action.data.results
        })

    case ACTION_PREV_QUESTION:
        if(state.currentQuestion > 0) {
            return Object.assign({}, state, { currentQuestion: state.currentQuestion-1})
        }
    case ACTION_NEXT_QUESTION:
        if(state.currentQuestion < state.questions.length) {
            return Object.assign({}, state, { currentQuestion: state.currentQuestion+1})
        }
    default:
      return state
    }
}

//===============================================================================

