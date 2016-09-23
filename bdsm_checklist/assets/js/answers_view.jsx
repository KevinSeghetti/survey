var React = require('react')
import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

var log = require('./loggingConfig').CreateLogger("AnswerView")

var AnswerPage = require('./AnswersView').AnswerPage

var {choices, choices_context} = require('./applicationData')
import { ACTION_LOAD,ACTION_SET_SEARCH_STRING } from './actionTypes'

var AnswerPage = require('./AnswersView').AnswerPage

var url=window.globs['questionsUrl']

//===============================================================================

const initialState = {
  questions: []
}

function topReducer(state = initialState, action) {

  switch (action.type) {
  case ACTION_LOAD:
      return Object.assign({}, state, {
          questions: action.questions
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
                this.setState({data: data})
                //this.state.store.dispatch({
                //    type: ACTION_LOAD,
                //    data: data,
                //})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString())
            }.bind(this)
        })
    },
    getInitialState: function() {

        return {data: { results: []} }

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





const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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




