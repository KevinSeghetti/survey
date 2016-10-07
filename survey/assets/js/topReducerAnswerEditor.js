//===============================================================================
// top level state reducer for the answer editor

var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")

var {choices, choices_context} = require('./applicationData')
import {
    ACTION_LOAD,
        ACTION_PREV_QUESTION,
        ACTION_NEXT_QUESTION,
        ACTION_SET_ANSWER_FIELD,
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
        return state
    case ACTION_NEXT_QUESTION:
        if(state.currentQuestion < state.questions.length) {
            return Object.assign({}, state, { currentQuestion: state.currentQuestion+1})
        }
        return state
    case ACTION_SET_ANSWER_FIELD:
        let {questionId,context,field,value } = action
        chai.expect(questionId).to.exist
        chai.expect(context).to.exist
        chai.expect(field).to.exist
        chai.expect(value).to.exist

        // look up index of question
        var questionIndex = state.questions.findIndex( x => x.question.id == questionId )

        if(questionIndex >= 0 ) {
            let question = state.questions[questionIndex]

            let newContextObject =  Object.assign({},question.answers[context],{ [field] : value })
            let newAnswerObject =  Object.assign({},question.answers,{ [context] : newContextObject })
            let newQuestionObject = Object.assign({},question, { "answers" : newAnswerObject })
            return(
                Object.assign({}, state, { questions:
                    state.questions.slice(0,questionIndex).concat(
                        newQuestionObject,
                       state.questions.slice(questionIndex+1)
                    )
                })
            )
        }
        return state

    default:
      return state
    }
}

//===============================================================================

