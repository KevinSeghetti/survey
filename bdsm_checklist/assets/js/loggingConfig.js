
// http://www.log4javascript.org/docs/manual.html
//var popUpAppender = new log4javascript.PopUpAppender();
var popUpAppender = new log4javascript.InPageAppender();
//var popUpAppender = new log4javascript.BrowserConsoleAppender();


export var CreateLogger = function(loggerName) {
    var log = log4javascript.getLogger(loggerName);
    var popUpLayout = new log4javascript.PatternLayout("%c - %d{HH:mm:ss} %-5p - %m%n");
    popUpAppender.setLayout(popUpLayout);
    log.addAppender(popUpAppender);

    return log
};



