var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var AnswerPage = require('./AnswersView').AnswerPage

var $ = require('jquery')
import { createStore } from 'redux'
var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("AnswerView")

var {choices, choices_context} = require('./applicationData')
import { ACTION_LOAD,ACTION_SET_SEARCH_STRING } from './actionTypes'

var AnswerPage = require('./AnswersView').AnswerPage


export var AnswerBox = React.createClass({
    loadAnswersFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                log.trace("== json loaded ==",data)
                this.setState({data: data})
                //this.state.store.dispatch({
                //    type: ACTION_LOAD,
                //    data: data,
                //})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },
    getInitialState: function() {

        return {data: { results: []} }

        //let store = createStore(topReducer)
        //return {data: { store: store} }
    },
    componentDidMount: function() {
        this.loadAnswersFromServer()
    },
    render: function() {
        log.trace("AnswerBox::render: props",this.props,", state = ",this.state)
        return (
            <AnswerPage data={this.state.data} />
        )
  }
})





// main entry point for answer viewer. This will go away if this project becomes
// a single page app

ReactDOM.render(
    <AnswerBox
        url={window.globs['questionsUrl']}
        pollInterval={2000}
    />,
    document.getElementById('react-app')
)


