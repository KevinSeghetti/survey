//===============================================================================
// filter reducers

var chai = require('chai')

var log = require('./loggingConfig').CreateLogger("reducers")

var {choices, choices_context} = require('./applicationData')
import { ACTION_LOAD,ACTION_SET_BOOLEAN_FILTER,ACTION_SET_RATING_FILTER,ACTION_SET_SEARCH_STRING } from './actionTypes'
import { loadAction, toggleBooleanFilterAction,  toggleRatingFilterAction } from './actionTypes'
import { mapObject } from './utilities'

//-------------------------------------------------------------------------------

function contextBooleanFilterReducer(state,action) {
    log.trace("contextlBooleanFilterReducer: filter state = ",JSON.stringify(state,null,2))
    let newValue = true
    if(action.id in state) {
        newValue = !state[action.id]
    }
    let result = Object.assign({}, state, { [action.id] : newValue })
    log.debug("contextBooleanFilterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
    return result

}

function contextRatingFilterReducer(state,action) {
    log.trace("contextlBooleanFilterReducer: filter state = ",JSON.stringify(state,null,2))
    let newValue = true
    if(action.rating in state) {
        newValue = !state[action.rating]
    }
    let result = Object.assign({}, state, { [action.rating] : newValue })
    log.debug("contextBooleanFilterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
    return result

}

function contextFilterReducer(state,action) {
    log.trace("contextFilterReducer: filter state = ",JSON.stringify(state,null,2))
    switch (action.type) {
        case ACTION_SET_BOOLEAN_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == 'booleans') {
                        return contextBooleanFilterReducer(state[key],action)
                    }
                    return contents
                })
                log.debug("contextFilterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }
        case ACTION_SET_RATING_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == 'rating') {
                        return contextRatingFilterReducer(state[key],action)
                    }
                    return contents
                })
                log.debug("contextFilterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }
        default:
          return state
    }
}

export function filterReducer(state,action) {
    log.trace("filterReducer: filter state = ",JSON.stringify(state,null,2))
    switch (action.type) {
        case ACTION_SET_BOOLEAN_FILTER:
        case ACTION_SET_RATING_FILTER:
            let result = mapObject(state, (contents,key) => {
                if (key == action.context) {
                    return contextFilterReducer(state[key],action)
                }
                return contents
            })
            log.debug("filterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
            return result

        default:
          return state
    }
}

