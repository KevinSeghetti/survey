//===============================================================================
// top level state reducer
var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")
import { combineReducers } from 'redux'

var {choices, choices_context} = require('./applicationData')
import {
    ACTION_LOAD,
    ACTION_LOAD_SINGLE_ANSWER,
    ACTION_SET_ANSWER_FIELD,
    ACTION_CHANGE_PAGE,
    } from 'constants/actionTypes'
import { loadAction, } from 'constants/actionTypes'
import * as Page from './pageTypes'
import { mapObject, defaultDict } from './utilities'
import answerEditorReducer from './topReducerAnswerEditor'
import answerViewerReducer from './topReducerAnswerViewer'

//===============================================================================

const navigationInitialState = {
   currentPage: Page.PAGE_HOME
}

//-------------------------------------------------------------------------------
// top of site navigation reducer

export function navigationReducer(state = navigationInitialState, action) {
    log.trace("navigationReducer: ",JSON.stringify(action,null,2))
    switch (action.type) {
        case ACTION_CHANGE_PAGE:
            {
                return Object.assign({}, state, { currentPage: action.page})
            }
            return state
        default:
          return state
        }
}

//===============================================================================

export function questionReducer(state = [], action) {

    log.trace("questionReducer: ",JSON.stringify(action,null,2))
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

export const topReducer = (state = {}, action) => ({
    questions: questionReducer(state.questions,action),
    navigation: navigationReducer(state.navigation,action,state.questions),
    answerEditPage: answerEditorReducer(state.answerEditPage,action,state.questions),
    answerViewPage: answerViewerReducer(state.answerViewPage,action,state.questions),
})

//===============================================================================

