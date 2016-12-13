//===============================================================================
// top level state reducer for the answer editor

var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")
import { combineReducers } from 'redux'

var {choices_context} = require('./applicationData')
import {
    ACTION_MOVE_CURSOR,
    ACTION_NEXT_UNANSWERED_QUESTION,
    } from './actionTypesAnswerEditor'
import {
    ACTION_LOAD,
    ACTION_LOAD_SINGLE_ANSWER,
    ACTION_SET_ANSWER_FIELD,
    } from './constants/actionTypes'

import {
    loadAction,
    loadSingleAnswerAction,
    oggleBooleanFilterAction,
    oggleRatingFilterAction
    } from './actionTypesAnswerEditor'
import { mapObject, defaultDict } from './utilities'
import { navigationReducer } from './navigationReducers'


//===============================================================================

export function questionReducer(state = [], action) {
    log.trace("questionReducer: state = ",state,", action = ",action)
    chai.expect(state).to.exist
    chai.expect(state).to.be.an.array
    chai.expect(action).to.exist
    chai.expect(action.type).to.exist

    switch (action.type) {
        case ACTION_LOAD:
            return(action.data.results)

            // kts not tested
        case ACTION_LOAD_SINGLE_ANSWER:
        {
            let {context } = action
            chai.expect(context).to.exist
            let questionId = action.data.question.questionId
            chai.expect(questionId).to.exist
            var questionIndex = state.findIndex( x => x.question.id == questionId )

            let newAnswerObject =  Object.assign({},question.answers,{ [context] : action.data })
            let newQuestionObject = Object.assign({},question, { "answers" : newAnswerObject })

            return(
                Object.assign({}, state, { questions:
                    state.slice(0,questionIndex).concat(
                        newQuestionObject,
                       state.slice(questionIndex+1)
                    )
                })
            )
        }

        case ACTION_SET_ANSWER_FIELD:
        {
            let {questionId,context,field,value } = action
            chai.expect(questionId).to.exist
            chai.expect(context).to.exist
            chai.expect(field).to.exist
            chai.expect(value).to.exist

            // look up index of question
            var questionIndex = state.findIndex( x => x.question.id == questionId )

            chai.expect(questionIndex).to.be.at.least(0)
            if(questionIndex >= 0 ) {
                let question = state[questionIndex]
                let existingContext = {
                    'context': context,
                    'question': { id: questionId },
                }

                if('answers' in question) {
                    if(context in question.answers) {
                        existingContext = question.answers[context]
                    }
                }
                let newContextObject =  Object.assign({},existingContext,{ [field] : value })
                let newAnswerObject =  Object.assign({},question.answers,{ [context] : newContextObject })
                let newQuestionObject = Object.assign({},question, { "answers" : newAnswerObject })
                return(
                    state.slice(0,questionIndex).concat(
                        newQuestionObject,
                        state.slice(questionIndex+1)
                    )
                )
            }
            return state
        }
        default:
          return state
    }
}

//-------------------------------------------------------------------------------

export const topReducer = (state = {}, action, questions) => ({
    questions: questionReducer(state.questions,action),
    navigation: navigationReducer(state.navigation,action,questions)
})

//function topReducer(state = {}, action, questions) {
//    log.trace("topReducerAnswerEditor: state = ",state,", action = ",action,", questions = ",questions)
//    return (
//    {
//        questions: questionReducer(state.questions,action),
//        navigation: navigationReducer(state.navigation,action,questions)
//    } )
//}

export default topReducer

//===============================================================================

