//===============================================================================
// top level action types

var log = require('./loggingConfig').CreateLogger("actions")

//-------------------------------------------------------------------------------

export const ACTION_LOAD = 'LOAD'
export const ACTION_LOAD_SINGLE_ANSWER = 'LOAD_SINGLE_ANSWER'
export const ACTION_SET_ANSWER_FIELD = 'SET_ANSWER_FIELD'
export const CHANGE_PAGE = 'CHANGE_PAGE'

//-------------------------------------------------------------------------------

export const loadAction = (data) => {
    return {
        type: ACTION_LOAD,
        data: data,
    }
}

//-------------------------------------------------------------------------------

export const loadSingleAnswerAction = (data) => {
    return {
        type: ACTION_LOAD_SINGLE_ANSWER,
        data: data,
    }
}

//-------------------------------------------------------------------------------

export const setField = (questionId, context,field,value) => {
    log.info('setField')

    return {
        type: ACTION_SET_ANSWER_FIELD,
        questionId: questionId,
        context: context,
        field: field,
        value: value,
    }
}

//-------------------------------------------------------------------------------

export const changePage = (page) => {
    return {
        type: ACTION_CHANGE_PAGE,
        page: page,
    }
}

//===============================================================================

