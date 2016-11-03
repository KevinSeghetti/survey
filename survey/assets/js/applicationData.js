
// bridge server side data into a module
// this contains data from the server side, that doesn't change
// per app, but is served from the server side so we don't repeat ourselves

// this set is for server side tests
export var appName             = 'appName'
export var userName            = 'userName'
export var questionsUrl        = 'questionsUrl'
export var SFW                 = 'SFW'
export var userAuthenticated   = 'userAuthenticated'
export var publishUrl          = 'publishUrl'
export var publishUrlText      = 'publishUrlText'
export var choices             = {"rating": [{"description": "N/A", "name": "na"}, {"description": "Love", "name": "love"}, {"description": "Like", "name": "like"}, {"description": "Don't Mind", "name": "dont_mind"}, {"description": "Dislike", "name": "dislike"}, {"description": "Hate", "name": "hate"}], "booleans": [{"description": "Essential", "name": "essential"}, {"description": "Curious", "name": "curious"}, {"description": "Have Done", "name": "have_done"}]}
export var choices_context     = [{"description": "Do Myself", "name": "to_me"}, {"description": "Watch Others Do", "name": "to_others"}]
export var csrfToken           = 'csrfToken'
export var defaultLoggingLevel = 'ALL'

var loggingLevel='ERROR'
loggingLevel='ALL'

export var loggingLevels       = {
    'AnswerView' : loggingLevel,
    'AnswerEdit' : loggingLevel,
    'viewerComponents' : loggingLevel,
    'answers_view' : loggingLevel,
    'answers_edit' : loggingLevel,
    'actions' : loggingLevel,
    'reducers' : loggingLevel,
}



// this is a total kludge, will go away once fully integrated as a one page app (including login)
// this set is for the running app
if(typeof window != 'undefined' && window && 'globs' in window)
{
    appName             = window.globs['appName']
    userName            = window.globs['userName']
    questionsUrl        = window.globs['questionsUrl']
    SFW                 = window.globs['SFW']
    userAuthenticated   = window.globs['userAuthenticated']
    publishUrl          = window.globs['publishUrl']
    publishUrlText      = window.globs['publishUrlText']
    choices             = window.globs['choices']
    choices_context     = window.globs['choices_context']
    csrfToken           = window.globs['csrfToken']
    defaultLoggingLevel = window.globs['defaultLoggingLevel']
    loggingLevels       = window.globs['loggingLevels']
}
