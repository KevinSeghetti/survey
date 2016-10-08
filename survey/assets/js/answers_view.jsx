var React = require('react')
import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

//-------------------------------------------------------------------------------

var log = require('./loggingConfig').CreateLogger("answers_view")
var { AnswerApp } = require('./AnswersView')
var {choices, choices_context} = require('./applicationData')
import { loadAction, } from './actionTypesAnswerViewer'
import { topReducer } from './topReducerAnswerViewer'

//-------------------------------------------------------------------------------

var url=window.globs['questionsUrl']
//let store = createStore(topReducer)
const store = createStore(topReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//===============================================================================

export var AnswerViewPage = React.createClass({
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
        log.trace("AnswerViewPage::componentDidMount")
        this.loadAnswersFromServer()
    },
    render: function() {
        log.trace("AnswerViewPage::render")
        return (
            <AnswerApp
            />
        )
  }
})

// main entry point for answer viewer. This will go away if this project becomes
// a single page app
//===============================================================================

render(
  <Provider store={store}>
    <AnswerViewPage />
  </Provider>,
  document.getElementById('react-app')
)

//===============================================================================

