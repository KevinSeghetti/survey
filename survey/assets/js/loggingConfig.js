// helpers to make logging easier in this application

var {defaultLoggingLevel, loggingLevels } = require('./applicationData')
var log4javascript = require('log4javascript')

// http://www.log4javascript.org/docs/manual.html
var popUpAppender = new log4javascript.PopUpAppender();
//var popUpAppender = new log4javascript.InPageAppender();
//var popUpAppender = new log4javascript.BrowserConsoleAppender();

//===============================================================================

var lookupLevel = function(loggingLevel)
{
     // allow logging levels to be referred to by name in a string
     var logLevels =
     {
          'ALL'   : log4javascript.Level.ALL  ,
          'TRACE' : log4javascript.Level.TRACE,
          'DEBUG' : log4javascript.Level.DEBUG,
          'INFO'  : log4javascript.Level.INFO ,
          'WARN'  : log4javascript.Level.WARN ,
          'ERROR' : log4javascript.Level.ERROR,
          'FATAL' : log4javascript.Level.FATAL,
          'OFF'   : log4javascript.Level.OFF  ,
     }

     if( loggingLevel in logLevels)
     {
          return logLevels[loggingLevel]
     }
     console.error(`error in logging system: logging level ${loggingLevel} not found`)

     return log4javascript.Level.OFF
}

//-------------------------------------------------------------------------------

export var CreateLogger = function(loggerName) {
    var log = log4javascript.getLogger(loggerName);
    var loggingLevel = log4javascript.Level.ALL
    if( defaultLoggingLevel  )
    {
         loggingLevel = lookupLevel(defaultLoggingLevel)
    }

    if( loggingLevels && loggerName in loggingLevels && loggingLevels[loggerName] )
    {
         loggingLevel = lookupLevel(loggingLevels[loggerName])
    }

    log.setLevel(loggingLevel)
    //console.error(`logging system: creating new logger named ${loggerName} with level ${loggingLevel} `)

    var popUpLayout = new log4javascript.PatternLayout("%c - %d{HH:mm:ss} %-5p - %m%n");
    popUpAppender.setLayout(popUpLayout);
    log.addAppender(popUpAppender);

    return log
};



