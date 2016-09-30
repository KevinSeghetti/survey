
// bridge server side data into a module
// this contains data from the server side, that doesn't change
// per app, but is served from the server side so we don't repeat ourselves

export var choices = window.globs['choices']
export var choices_context = window.globs['choices_context']
export var csrfToken = window.globs['csrfToken']
export var defaultLoggingLevel = window.globs['defaultLoggingLevel']
export var loggingLevels = window.globs['loggingLevels']

