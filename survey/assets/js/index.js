// apps main entry point

import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

//-------------------------------------------------------------------------------

var log = require('./loggingConfig').CreateLogger("answers_view")
var { NavigationBar } = require('./navigationBar')
var { AnswerEditorPage } = require('./AnswersEdit')
var { AnswerViewerPage } = require('./AnswersView')
var { HomePage } = require('./homePage')

import { loadAction, } from './actionTypes'
import { topReducer } from './topReducer'
import * as Page from './pageTypes'

//-------------------------------------------------------------------------------

var url=window.globs['questionsUrl']
//let store = createStore(topReducer)
const store = createStore(topReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//===============================================================================

export class IndexPage extends React.Component {
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
        log.trace("IndexPage::componentDidMount")
        this.loadAnswersFromServer()
    }
    render() {
        log.trace("IndexPage::render")
        //let { store } = this.props

        let appPages =
        {
            [Page.PAGE_MAIN          ]: HomePage         ,
            [Page.PAGE_ANSWER_EDITOR ]: AnswerEditorPage ,
            [Page.PAGE_ANSWER_VIEWER ]: AnswerViewerPage ,
            //PAGE_QUESTION_VIEWER: < App />,
        }

        let appPage = HomePage
        if(store.navigation && store.navigation.currentPage)
        {
            appPage = appPages[store.navigation.currentPage]
        }

        let foo = HomePage
        return (
            <div> top level of app
            <NavigationBar />
            <HomePage />
            <AnswerEditorPage />
            </div>
        )
  }
}

//===============================================================================

render(
  <Provider store={store}>
    <IndexPage />
  </Provider>,
  document.getElementById('react-app')
)

//===============================================================================


