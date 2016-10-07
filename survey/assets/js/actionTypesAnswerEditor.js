//===============================================================================
// action types for the answer editor page

var log = require('./loggingConfig').CreateLogger("actions")

//-------------------------------------------------------------------------------

let PAGENAME="ANSWER_EDITOR"

export const ACTION_LOAD = PAGENAME+'LOAD'
export const ACTION_NEXT_QUESTION = PAGENAME+'_NEXT_QUESTION'
export const ACTION_PREV_QUESTION = PAGENAME+'_PREV_QUESTION'

//-------------------------------------------------------------------------------

export const loadAction = (data) => {
    return {
        type: ACTION_LOAD,
        data: data,
    }
}

//-------------------------------------------------------------------------------

export const prevQuestionAction = () => {
    log.info('prevQuestionAction')

    return {
        type: ACTION_PREV_QUESTION,
    }
}

//-------------------------------------------------------------------------------

export const nextQuestionAction = () => {
    log.info('nextQuestionAction')

    return {
        type: ACTION_NEXT_QUESTION,
    }
}

//===============================================================================
