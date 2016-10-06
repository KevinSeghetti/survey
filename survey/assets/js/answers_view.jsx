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
    toggleBooleanFilterAction,
    toggleRatingFilterAction,
    clearBooleanFilterAction,
    clearRatingFilterAction,
    } from './actionTypesAnswerViewer'
import { topReducer } from './topReducerAnswerViewer'

//-------------------------------------------------------------------------------

var url=window.globs['questionsUrl']
let store = createStore(topReducer)

//===============================================================================

export var AnswerBox = React.createClass({
    loadAnswersFromServer: function() {
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                log.trace("== json loaded ==",data)
                this.props.onLoad(data)
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString())
            }.bind(this)
        })
    },
    componentDidMount: function() {
        this.loadAnswersFromServer()
    },
    render: function() {
        log.trace("AnswerBox::render: props",JSON.stringify(this.props,null,2))
        return (
            <AnswerPage
                data={this.props.data}
                toggleRatingFilterAction  = { this.props.toggleRatingFilterAction }
                toggleBooleanFilterAction = { this.props.toggleBooleanFilterAction}
                clearRatingFilterAction  = { this.props.clearRatingFilterAction }
                clearBooleanFilterAction = { this.props.clearBooleanFilterAction}
            />
        )
  }
})

//-------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    log.trace("mapStateToProps: state = ",JSON.stringify(state,null,2))
    return {
        data: state
    }
}

//-------------------------------------------------------------------------------

const mapDispatchToProps = (dispatch) => {
  return {
      onLoad: (data) => {
          dispatch(loadAction(data))
      },
      toggleBooleanFilterAction: (context, filter) => {
          dispatch(toggleBooleanFilterAction(context, filter) )
      },
      toggleRatingFilterAction: (context, rating) => {
          dispatch(toggleRatingFilterAction(context, rating) )
      },
      clearRatingFilterAction: (context) => {
          dispatch(clearRatingFilterAction(context) )
      },
      clearBooleanFilterAction: (context) => {
          dispatch(clearBooleanFilterAction(context) )
      },
  }
}

//-------------------------------------------------------------------------------

const AnswerApp = connect(
  mapStateToProps,
  mapDispatchToProps
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

