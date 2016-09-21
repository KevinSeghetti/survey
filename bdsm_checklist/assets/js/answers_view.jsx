var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var AnswerBox = require('./AnswersView').AnswerBox

// main entry point for answer viewer. This will go away if this project becomes
// a single page app

ReactDOM.render(
    <AnswerBox
        url={window.globs['questionsUrl']}
        pollInterval={2000}
    />,
    document.getElementById('react-app')
)


