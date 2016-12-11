//===============================================================================
// action types for the answer viewer page

var log = require('./loggingConfig').CreateLogger("actions")

//-------------------------------------------------------------------------------

export const ACTION_LOAD = 'LOAD'
export const ACTION_TOGGLE_RATING_FILTER = 'SET_RATING_FILTER'
export const ACTION_TOGGLE_BOOLEAN_FILTER = 'TOGGLE_BOOLEAN_FILTER'

export const ACTION_CLEAR_RATING_FILTER = 'CLEAR_RATING_FILTER'
export const ACTION_CLEAR_BOOLEAN_FILTER = 'CLEAR_BOOLEAN_FILTER'

export const ACTION_SET_SEARCH_STRING = 'SET_SEARCH_STRING'

//-------------------------------------------------------------------------------

export const loadAction = (data) => {
    return {
        type: ACTION_LOAD,
        data: data,
    }
}

//-------------------------------------------------------------------------------

export const toggleBooleanFilterAction = (context, id) => {
    log.info('toggleBooleanFilterAction', context, id)

    return {
        type: ACTION_TOGGLE_BOOLEAN_FILTER,
        context: context,
        id: id,
    }
}

//-------------------------------------------------------------------------------

export const toggleRatingFilterAction = (context, rating) => {
    log.info('toggleRatingFilterAction', context, rating)
    return {
        type: ACTION_TOGGLE_RATING_FILTER,
        context: context,
        rating: rating,
    }
}

//-------------------------------------------------------------------------------

export const clearRatingFilterAction = (context) => {
    log.info('clearRatingFilterAction')
    return {
        type: ACTION_CLEAR_RATING_FILTER,
        context: context,
    }
}

//-------------------------------------------------------------------------------

export const clearBooleanFilterAction = (context) => {
    log.info('clearBooleanFilterAction')
    return {
        type: ACTION_CLEAR_BOOLEAN_FILTER,
        context: context,
    }
}

//===============================================================================

