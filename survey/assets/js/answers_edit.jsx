import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

//-------------------------------------------------------------------------------

var log = require('./loggingConfig').CreateLogger("answers_view")
var AnswerPage = require('./AnswersEdit').AnswerPage
var {choices, choices_context} = require('./applicationData')
import { loadAction, } from './actionTypesAnswerEditor'
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
                store.dispatch(loadAction(data))
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

const AnswerApp = connect(
  mapStateToProps,
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

