import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

//-------------------------------------------------------------------------------

var log = require('./loggingConfig').CreateLogger("answers_view")
var AnswerPage = require('./AnswersEdit').AnswerPage
var {choices, choices_context} = require('./applicationData')
import {
    loadAction,
    prevQuestionAction,
    nextQuestionAction,
    } from './actionTypesAnswerEditor'
import { topReducer } from './topReducerAnswerEditor'

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
        //log.trace("AnswerBox::render: props",JSON.stringify(this.props,null,2))
        chai.expect(this.props.questions).to.exist
        chai.expect(this.props.currentQuestion).to.exist
        chai.expect(this.props.prevQuestionAction).to.exist
        chai.expect(this.props.nextQuestionAction).to.exist

        return (
            <AnswerPage
                {...this.props }
            />
        )
  }
})

//-------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    log.trace("mapStateToProps: ")
    //log.trace("mapStateToProps: state = ",JSON.stringify(state,null,2))
    return {
        questions: state.questions,
        currentQuestion: state.currentQuestion,
    }
}

//-------------------------------------------------------------------------------

const mapDispatchToProps = (dispatch) => {
  return {
      onLoad: (data) => {
          dispatch(loadAction(data))
      },
      prevQuestionAction: () => {
          dispatch(prevQuestionAction() )
      },
      nextQuestionAction: () => {
          dispatch(nextQuestionAction() )
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

