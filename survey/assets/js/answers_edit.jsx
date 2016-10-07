import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

//-------------------------------------------------------------------------------

var log = require('./loggingConfig').CreateLogger("answers_view")
var { AnswerApp } = require('./AnswersEdit')
import { loadAction, } from './actionTypesAnswerEditor'
import { topReducer } from './topReducerAnswerEditor'

//-------------------------------------------------------------------------------

var url=window.globs['questionsUrl']
let store = createStore(topReducer)

//===============================================================================

export class AnswerEditPage extends React.Component {
    loadAnswersFromServer() {
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
    }
    componentDidMount() {
        this.loadAnswersFromServer()
    }
    render() {
        //log.trace("AnswerEditPage::render: props",JSON.stringify(this.props,null,2))
        return (
            <AnswerApp
            />
        )
  }
}

// main entry point for answer viewer. This will go away if this project becomes
// a single page app
//===============================================================================

render(
  <Provider store={store}>
    <AnswerEditPage />
  </Provider>,
  document.getElementById('react-app')
)

//===============================================================================

