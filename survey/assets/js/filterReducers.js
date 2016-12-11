//===============================================================================
// filter reducers

var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("reducers")

var {choices} = require('./applicationData')
import {
    ACTION_TOGGLE_BOOLEAN_FILTER,
    ACTION_TOGGLE_RATING_FILTER,
    ACTION_CLEAR_BOOLEAN_FILTER,
    ACTION_CLEAR_RATING_FILTER,
    ACTION_SET_SEARCH_STRING
    } from './actionTypesAnswerViewer'

import { mapObject,defaultDict } from './utilities'

//-------------------------------------------------------------------------------

export function contextBooleanFilterReducer(state={},action) {
    log.trace ("contextlBooleanFilterReducer: filter state = ",JSON.stringify(state,null,2),", action = ",JSON.stringify(action,null,2))
    let newValue = true
    let result = state
    switch (action.type) {
        case ACTION_TOGGLE_BOOLEAN_FILTER:
        {
            log.trace ("contextlBooleanFilterReducer:ACTION_TOGGLE_RATING_FILTER action id = ",action.id)
            if(action.id in state) {
                newValue = !state[action.id]
            }
            result = Object.assign({}, state, { [action.id] : newValue })
        }
    }
    log.debug("contextBooleanFilterReducer:ACTION_TOGGLE_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
    return result

}

export function contextRatingFilterReducer(state={},action) {
    log.trace ("contextRatingFilterReducer: filter state = ",JSON.stringify(state,null,2))
    let newValue = true
    let result = state
    switch (action.type) {
        case ACTION_TOGGLE_RATING_FILTER:
        {
            if(action.rating in state) {
                newValue = !state[action.rating]
            }
            result = Object.assign({}, state, { [action.rating] : newValue })
        }
    }
    log.debug("contextBooleanFilterReducer:ACTION_TOGGLE_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
    return result
}

export function contextFilterReducer(state,action) {
    log.trace("contextFilterReducer: filter state = ",JSON.stringify(state,null,2))
    switch (action.type) {
        case ACTION_TOGGLE_BOOLEAN_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == 'booleans') {
                        return contextBooleanFilterReducer(state[key],action)
                    }
                    return contents
                })
                log.debug("contextFilterReducer:ACTION_TOGGLE_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }
        case ACTION_TOGGLE_RATING_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == 'rating') {
                        return contextRatingFilterReducer(state[key],action)
                    }
                    return contents
                })
                log.debug("contextFilterReducer:ACTION_TOGGLE_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }
        case ACTION_CLEAR_BOOLEAN_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == 'booleans') {
                        return defaultDict(choices.booleans,false)
                    }
                    return contents
                })
                log.debug("contextFilterReducer:ACTION_CLEAR_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }
        case ACTION_CLEAR_RATING_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == 'rating') {
                        return Object.assign({} )
                    }
                    return contents
                })
                log.debug("contextFilterReducer:ACTION_CLEAR_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }

        default:
          return state
    }
}

const initialFilterState = {
  'to_me': {
      booleans: defaultDict(choices.booleans,true),
      rating: defaultDict(choices.rating,true),
  },
  'to_others': {
      booleans: defaultDict(choices.booleans,true),
      rating: defaultDict(choices.rating,true),
  }
}


export function filterReducer(state= initialFilterState, action) {
    log.trace("filterReducer: action = ",JSON.stringify(action),", filter state = ",JSON.stringify(state,null,2))
    switch (action.type) {
        case ACTION_TOGGLE_BOOLEAN_FILTER:
        case ACTION_TOGGLE_RATING_FILTER:
        case ACTION_CLEAR_BOOLEAN_FILTER:
        case ACTION_CLEAR_RATING_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == action.context) {
                        return contextFilterReducer(state[key],action)
                    }
                    return contents
                })
                log.debug("filterReducer:ACTION_TOGGLE_*_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }

        default:
          return state
    }
}

