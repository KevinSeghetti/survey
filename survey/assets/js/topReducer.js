//===============================================================================
// top level state reducer

var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")

var {choices, choices_context} = require('./applicationData')
import {
    ACTION_LOAD,
        ACTION_TOGGLE_BOOLEAN_FILTER,
        ACTION_TOGGLE_RATING_FILTER,
        ACTION_CLEAR_BOOLEAN_FILTER,
        ACTION_CLEAR_RATING_FILTER,
        ACTION_SET_SEARCH_STRING,
    } from './actionTypes'
import { loadAction, toggleBooleanFilterAction,  toggleRatingFilterAction } from './actionTypes'
import { mapObject } from './utilities'
import { filterReducer } from './filterReducers'

//===============================================================================

let defaultDict = function(choices) {
    let result = {}
    choices.forEach( (choice) => {
        result[choice['name']] = true
    })
    return result
}

const initialState = {
  questions: [],
  filters:
  {
      'to_me': {
          booleans: defaultDict(choices.booleans),
          rating: defaultDict(choices.rating),
      },
      'to_others': {
          booleans: defaultDict(choices.booleans),
          rating: defaultDict(choices.rating),
      }
  }
}

//-------------------------------------------------------------------------------

export function topReducer(state = initialState, action) {

    log.trace("topReducer: ",JSON.stringify(action,null,2))
    switch (action.type) {
    case ACTION_LOAD:

        return Object.assign({}, state, {
            questions: action.data.results
        })
    case ACTION_TOGGLE_BOOLEAN_FILTER:
    case ACTION_TOGGLE_RATING_FILTER:
    case ACTION_CLEAR_BOOLEAN_FILTER:
    case ACTION_CLEAR_RATING_FILTER:
        let result = Object.assign({}, state, {
          filters: filterReducer(state.filters, action)
        })
        log.debug("topReducer:ACTION_TOGGLE_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
        return result
    default:
      return state
    }
}

//===============================================================================

