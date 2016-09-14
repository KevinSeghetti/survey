var React = require('react')
var ReactDOM = require('react-dom')
//var AnswerBox = require('./Answers').AnswerBox
var App = require('./app')
var $ = require('jquery')

ReactDOM.render(
    <App/>,
//    <AnswerBox url={'/rest/answers/'} pollInterval={2000} />,
    document.getElementById('react-app')
)


