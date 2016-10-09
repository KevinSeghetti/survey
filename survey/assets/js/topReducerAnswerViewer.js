//===============================================================================
// top level state reducer for the answer viewer

var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")
import { combineReducers } from 'redux'

import { ACTION_LOAD, } from './actionTypesAnswerViewer'
import { filterReducer } from './filterReducers'

//===============================================================================

export function questionReducer(state = [], action) {

    log.trace("questionReducer: ",JSON.stringify(action,null,2))
    switch (action.type) {
    case ACTION_LOAD:
        return action.data.results
    default:
      return state
    }
}

//-------------------------------------------------------------------------------

export const topReducer = combineReducers({
    questions: questionReducer,
    filters: filterReducer
})

//===============================================================================

