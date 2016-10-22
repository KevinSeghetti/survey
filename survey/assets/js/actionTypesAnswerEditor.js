//===============================================================================
// action types for the answer editor page

var log = require('./loggingConfig').CreateLogger("actions")

//-------------------------------------------------------------------------------

let PAGENAME="ANSWER_EDITOR"

export const ACTION_LOAD = PAGENAME+'LOAD'
export const ACTION_LOAD_SINGLE_ANSWER = PAGENAME+'LOADSINGLEANSWER'
export const ACTION_MOVE_CURSOR = PAGENAME+'_MOVE_CURSOR'
export const ACTION_NEXT_UNANSWERED_QUESTION = PAGENAME+'_NEXT_UNANSWERED_QUESTION'
export const ACTION_SAVE_ANSWERS = PAGENAME+'_SAVE_ANSWERS'

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

export const moveCursorAction = (delta) => {
    log.info('moveCursorAction')

    return {
        type: ACTION_MOVE_CURSOR,
        delta: delta
    }
}

//-------------------------------------------------------------------------------

export const nextUnansweredQuestionAction = (delta) => {
    log.trace('nextUnansweredQuestionAction')

    return {
        type: ACTION_NEXT_UNANSWERED_QUESTION,
        delta: delta
    }
}

//-------------------------------------------------------------------------------

export const saveAnswers = (questionId, ) => {
    log.info('saveAnswers',questionId)

    return {
        type: ACTION_SAVE_ANSWERS,
        questionId: questionId,
    }
}

//===============================================================================

