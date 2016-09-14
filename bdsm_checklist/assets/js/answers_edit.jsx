var React = require('react')
var ReactDOM = require('react-dom')
var App = require('./Answers')

ReactDOM.render(
    <AnswerBox url={'/rest/answers/'} pollInterval={2000} />,
    document.getElementById('content')
);


