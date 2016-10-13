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

var {questionsUrl, userName, userAuthenticated } = require('./applicationData')
//let store = createStore(topReducer)
const store = createStore(topReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//===============================================================================

export class IndexPagePresentational extends React.Component {
    loadAnswersFromServer() {
        $.ajax({
            url: questionsUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                log.trace("== json loaded ==",data)
                store.dispatch(loadAction(data))
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(questionsUrl, status, err.toString())
            }.bind(this)
        })
    }
    componentDidMount() {
        log.trace("IndexPage::componentDidMount")
        if(userAuthenticated)
        {
            this.loadAnswersFromServer()
        }
    }
    render() {
        log.trace("IndexPage::render")
        let {navigation} = this.props
        chai.expect(navigation).to.exist

        let appPages =
        {
            [Page.PAGE_HOME          ]: HomePage         ,
            [Page.PAGE_ANSWER_EDITOR ]: AnswerEditorPage ,
            [Page.PAGE_ANSWER_VIEWER ]: AnswerViewerPage ,
            //PAGE_QUESTION_VIEWER: < App />,
        }

        let AppPage = HomePage
        if(navigation && navigation.currentPage)
        {
            AppPage = appPages[navigation.currentPage]
        }

        chai.expect(AppPage).to.exist

        return (
            <div>
            <NavigationBar />
            <AppPage />
            </div>
        )
  }
}

//-------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    log.trace("indexMapStateToProps: state = ",JSON.stringify(state,null,2))
    return {
        navigation: state.navigation,
    }
}

//-------------------------------------------------------------------------------

const IndexPage = connect(
  mapStateToProps,
)(IndexPagePresentational)


//===============================================================================

render(
  <Provider store={store}>
    <IndexPage />
  </Provider>,
  document.getElementById('react-app')
)

//===============================================================================


