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

export const toggleBooleanFilterAction = (boolean) => {
    log.info('toggleBooleanFilterAction', boolean)

    return {
        type: ACTION_SET_BOOLEAN_FILTER,
        boolean: boolean,
    }
}

export const toggleRatingFilterAction = (rating) => {
    log.info('toggleRatingFilterAction', rating)
    return {
        type: ACTION_SET_RATING_FILTER,
        rating: rating,
    }
}

