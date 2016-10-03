var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var AnswerBox = require('./AnswersEdit').AnswerBox

ReactDOM.render(
    <AnswerBox
        url={window.globs['questionsUrl']}
        pollInterval={2000}
    />,
    document.getElementById('react-app')
)


