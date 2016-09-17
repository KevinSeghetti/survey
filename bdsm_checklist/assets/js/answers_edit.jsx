var React = require('react')
var ReactDOM = require('react-dom')
var AnswerBox = require('./Answers').AnswerBox
var $ = require('jquery')

ReactDOM.render(
//    <App/>,
    <AnswerBox
        url={window.globs['questionsUrl']}
        pollInterval={2000}
        choices_context={window.globs['choices_context']}
        choices={window.globs['choices']}

    />,
    document.getElementById('react-app')
)


