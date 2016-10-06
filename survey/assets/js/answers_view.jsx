var React = require('react')
import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

//-------------------------------------------------------------------------------

var log = require('./loggingConfig').CreateLogger("answers_view")
var AnswerPage = require('./AnswersView').AnswerPage
var {choices, choices_context} = require('./applicationData')
import {
    loadAction,
    } from './actionTypesAnswerViewer'
import { topReducer } from './topReducerAnswerViewer'

//-------------------------------------------------------------------------------

var url=window.globs['questionsUrl']
let store = createStore(topReducer)

//===============================================================================
// kts TODO: this is all wrong. using connect, the functional portions shouldn't be in this presentational class

export var AnswerBox = React.createClass({
    loadAnswersFromServer: function() {
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                log.trace("== json loaded ==",data)
                store.dispatch(loadAction(data))
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString())
            }.bind(this)
        })
    },
    componentDidMount: function() {
        log.trace("AnswerBox::componentDidMount")
        this.loadAnswersFromServer()
    },
    render: function() {
        return (
            <AnswerPage
            />
        )
  }
})

//-------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    //log.trace("mapStateToProps: state = ",JSON.stringify(state,null,2))
    //log.trace("mapStateToProps: state type = ",typeof(state))
    return {
        state: state
    }
}

//-------------------------------------------------------------------------------

const AnswerApp = connect(
  mapStateToProps
)(AnswerBox)

// main entry point for answer viewer. This will go away if this project becomes
// a single page app
//===============================================================================

render(
  <Provider store={store}>
    <AnswerApp />
  </Provider>,
  document.getElementById('react-app')
)

//===============================================================================

