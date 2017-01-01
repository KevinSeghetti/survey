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

function setCurrentQuestion(state,questions,newCursor)
{
    log.trace("newcursor = ",newCursor)
    if(newCursor != state.currentQuestion) {
        saveAnswers(questions[state.currentQuestion])
        return Object.assign({}, state, { currentQuestion: newCursor})
    }
    return state

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
                return setCurrentQuestion(state,questions,newCursor)

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

                // kts smell: I'm sure there is a better way to do this, wrote when I didn't have network access
                // we now have the index in tne newly constructed array, but that doesn't directly map to the old array
                // so we need to find that
                // proper solution to this is probably to zip the new array with the old indexes

                let newCursorIndex = questions.findIndex(
                    (obj) =>
                        {return obj === localQuestionArray[unansweredQuestionIndex]}
                    )


                return setCurrentQuestion(state,questions,newCursorIndex)
            }
            return state

        default:
          return state
        }
}

//===============================================================================

