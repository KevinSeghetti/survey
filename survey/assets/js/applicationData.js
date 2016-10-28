
// bridge server side data into a module
// this contains data from the server side, that doesn't change
// per app, but is served from the server side so we don't repeat ourselves

export var appName             = 'appName'
export var userName            = 'userName'
export var questionsUrl        = 'questionsUrl'
export var SFW                 = 'SFW'
export var userAuthenticated   = 'userAuthenticated'
export var publishUrl          = 'publishUrl'
export var publishUrlText      = 'publishUrlText'
export var choices             = 'choices'
export var choices_context     = 'choices_context'
export var csrfToken           = 'csrfToken'
export var defaultLoggingLevel = 'defaultLoggingLevel'
export var loggingLevels       = 'loggingLevels'


// this is a total kludge, will go away once fully integrated as a one page app (including login)

if(typeof window != 'undefined' && window && 'globs' in window)
{
    var appName             = window.globs['appName']
    var userName            = window.globs['userName']
    var questionsUrl        = window.globs['questionsUrl']
    var SFW                 = window.globs['SFW']
    var userAuthenticated   = window.globs['userAuthenticated']
    var publishUrl          = window.globs['publishUrl']
    var publishUrlText      = window.globs['publishUrlText']
    var choices             = window.globs['choices']
    var choices_context     = window.globs['choices_context']
    var csrfToken           = window.globs['csrfToken']
    var defaultLoggingLevel = window.globs['defaultLoggingLevel']
    var loggingLevels       = window.globs['loggingLevels']
}
