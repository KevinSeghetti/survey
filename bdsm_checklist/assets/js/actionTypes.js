

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
    return {
        type: ACTION_SET_BOOLEAN_FILTER,
        boolean: boolean,
    }
}

