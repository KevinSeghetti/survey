var log = require('./loggingConfig').CreateLogger("actions")


export const ACTION_LOAD = 'LOAD'
export const ACTION_SET_RATING_FILTER = 'SET_RATING_FILTER'
export const ACTION_SET_BOOLEAN_FILTER = 'SET_BOOLEAN_FILTER'
export const ACTION_SET_SEARCH_STRING = 'SET_SEARCH_STRING'

export const loadAction = (data) => {
    return {
        type: ACTION_LOAD,
        data: data,
    }
}

export const toggleBooleanFilterAction = (context, id) => {
    log.info('toggleBooleanFilterAction', context, id)

    return {
        type: ACTION_SET_BOOLEAN_FILTER,
        context: context,
        id: id,
    }
}

export const toggleRatingFilterAction = (context, rating) => {
    log.info('toggleRatingFilterAction', context, rating)
    return {
        type: ACTION_SET_RATING_FILTER,
        context: context,
        rating: rating,
    }
}

