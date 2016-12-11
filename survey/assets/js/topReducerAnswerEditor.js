//===============================================================================
// top level state reducer for the answer editor

var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")
import { combineReducers } from 'redux'

var {choices, choices_context} = require('./applicationData')
import {
    ACTION_LOAD,
    ACTION_LOAD_SINGLE_ANSWER,
    ACTION_MOVE_CURSOR,
    ACTION_SET_ANSWER_FIELD,
    ACTION_NEXT_UNANSWERED_QUESTION,
    } from './actionTypesAnswerEditor'
import {
    loadAction,
    loadSingleAnswerAction,
    oggleBooleanFilterAction,
    oggleRatingFilterAction
    } from './actionTypesAnswerEditor'
import { mapObject, defaultDict } from './utilities'
import { filterReducer } from './filterReducers'

//===============================================================================

const navigationInitialState = {
   currentQuestion: 0
}

//-------------------------------------------------------------------------------

function saveContextAnswer(answers) {
  var url = "/rest/answers/"       // for cases where we don't have an answer record yet
  var requestType = 'POST'
  if('url' in  answers)
  {
    url = answers.url
    requestType = 'PUT'
  }
  var postData = {}
  postData = answers

    //kts smell
  // csrf setup
  log.info("x crsr",window.globs['csrfToken'])
  $.ajaxSetup({
      headers: {
          'X-CSRFToken': window.globs['csrfToken']
      }
  })

  $.ajax({
    url: url,
    dataType: 'json',
    type: requestType,
    data: postData,
    success: (data) => {
      log.info("saveAnswer: success: returned data = ",JSON.stringify(data))
      // we have updated data from the server side, need to look up where to put it

      // kts todo
      //store.dispatch(loadSingleAnswerAction(data))

      log.info("== json loaded ==",data)
      //this.setState({data: data})

    },
    error: (xhr, status, err) => {
      //this.setState({data: answers})
      console.error(url, status, err.toString())
    }
  })
}

function saveAnswers(question)
{
    chai.expect(question).to.exist
    log.trace("saveAnswers:",JSON.stringify(question,null,2))
    if('answers' in question) {
        let { answers } = question
        var contextNodes = choices_context.map((context) => {
          var contextName = context['name']
              log.trace("saveAnswers:context:",contextName)
          // look up answer, if present
          var contextanswers
          if(contextName in answers)
          {
            let contextAnswers = answers[contextName]
            saveContextAnswer(contextAnswers)
          }
        })
    }
}

//-------------------------------------------------------------------------------

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

export function questionReducer(state = [], action) {
    log.trace("!questionReducer: state = ",state,", action = ",action)
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

const topReducer = (state = {}, action, questions) => ({
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

