//===============================================================================
// navigation reducer
var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")
import { combineReducers } from 'redux'

import {
    ACTION_MOVE_CURSOR,
    ACTION_NEXT_UNANSWERED_QUESTION,
    } from 'actionTypesAnswerEditor'

import { saveAnswers } from "serverCommunication"

import { mapObject, defaultDict } from './utilities'
var {choices_context} = require('./applicationData')

//-------------------------------------------------------------------------------

const navigationInitialState = {
   currentQuestion: 0
}

//-------------------------------------------------------------------------------
// actrion types answer editor navigation reducer

export function navigationReducer(state = navigationInitialState, action, questions) {
    log.trace("navigationReducer: ",JSON.stringify(action,null,2))
    switch (action.type) {
        case ACTION_MOVE_CURSOR:
            {
                chai.expect(questions).to.exist
                let newCursor = Math.min(Math.max(parseInt(state.currentQuestion+action.delta), 0), questions.length-1)
                if(action.delta == Number.POSITIVE_INFINITY) {
                    newCursor = questions.length-1
                }
                if(action.delta == Number.NEGATIVE_INFINITY) {
                    newCursor = 0
                }

                if(newCursor != state.currentQuestion) {
                    saveAnswers(questions[state.currentQuestion])
                    return Object.assign({}, state, { currentQuestion: newCursor})
                }
                return state
            }
            return state
        case ACTION_NEXT_UNANSWERED_QUESTION:
            {
                chai.expect(questions).to.exist
                log.trace("ACTION_NEXT_UNANSWERED_QUESTION: currentQuestion = ",state.currentQuestion)
                log.trace("ACTION_NEXT_UNANSWERED_QUESTION: questions = ",questions)

                let localQuestionArray = questions.slice(state.currentQuestion+1).concat(questions.slice(0,state.currentQuestion))
                log.trace("ACTION_NEXT_UNANSWERED_QUESTION: localquestions = ",localQuestionArray)
                // find next unanswered question
                let unansweredQuestionIndex = localQuestionArray.findIndex(
                    (obj) =>
                        { return !('answers' in obj)  }
                    )

                let newCursor = unansweredQuestionIndex

                log.trace("newcursor = ",newCursor)
                if(newCursor != state.currentQuestion) {
                    saveAnswers(questions[state.currentQuestion])
                    return Object.assign({}, state, { currentQuestion: newCursor})
                }
                return state
            }
            return state

        default:
          return state
        }
}

//===============================================================================

