var React = require('react')
import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

var log = require('./loggingConfig').CreateLogger("answers_view")

var AnswerPage = require('./AnswersView').AnswerPage

var {choices, choices_context} = require('./applicationData')
import { ACTION_LOAD,ACTION_SET_SEARCH_STRING } from './actionTypes'
import { loadAction } from './actionTypes'

var AnswerPage = require('./AnswersView').AnswerPage

var url=window.globs['questionsUrl']

//===============================================================================

const initialState = {
  questions: []
}

function topReducer(state = initialState, action) {

  log.trace("topReducer",JSON.stringify(action))
  switch (action.type) {
  case ACTION_LOAD:

      return Object.assign({}, state, {
          questions: action.data.results
      })
  default:
    return state
  }
}


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
        log.trace("AnswerBox::render: props",JSON.stringify(this.props))
        return (
            <AnswerPage data={this.props.data} />
        )
  }
})


const mapStateToProps = (state) => {
    log.trace("mapStateToProps: state = ",JSON.stringify(state))
    return {
        data: state
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onLoad: (data) => {
          dispatch(loadAction(data))
      }
    //onTodoClick: (id) => {
    //  dispatch(toggleTodo(id))
    //}
  }
}

const AnswerApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerBox)

// main entry point for answer viewer. This will go away if this project becomes
// a single page app

let store = createStore(topReducer)

render(
  <Provider store={store}>
    <AnswerApp />
  </Provider>,
  document.getElementById('react-app')
)

