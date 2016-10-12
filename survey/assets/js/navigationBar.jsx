// site wide navigation bar

var React = require('react')
var ReactDOM = require('react-dom')
import { Provider,connect } from 'react-redux'
var $ = require('jquery')
var chai = require('chai')

import * as Page from './pageTypes'
import { changePage, } from './actionTypes'
var { appName,userAuthenticated, userName } = require('./applicationData')
var { LinkButton, } = require('./uiComponents')

var log = require('./loggingConfig').CreateLogger("NavigationBar")

//===============================================================================

const NavigationBarPresentation = ({navBarClick,currentPage}) => {
    let loggedInOptions = []
    let userOptions = [
            <li key='navbar-user-login' ><a href="/accounts/login">Login</a>   </li>,
            <li key='navbar-user-register' ><a href="/accounts/register">Register</a></li>
        ]
        if(userAuthenticated)
        {
            userOptions = [
                <li key='navbar-user-name'><p className="navbar-text">User { userName }</p></li>,
                <li key='navbar-user-logout'><a href="/accounts/logout">Logout</a></li>
           ]
           loggedInOptions = [
                    <li key='navbar-checklist' className={currentPage==Page.PAGE_ANSWER_EDITOR  ?'active':''}><LinkButton value="Checklist" handleClick={navBarClick} nav={Page.PAGE_ANSWER_EDITOR  } /></li>,
                    <li key='navbar-result' className={currentPage==Page.PAGE_ANSWER_VIEWER  ?'active':''}><LinkButton value="Results  " handleClick={navBarClick} nav={Page.PAGE_ANSWER_VIEWER  } /></li>
           ]

        }

    return(
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="navbar-left">
                <img src="images/logo.png" alt="logo" height="38" width="38"></img>&nbsp;
              </div>
              <div className="navbar-left">
                <a className="navbar-brand" href="" >{ appName }</a>
              </div>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                    <li key='navbar-home' className={currentPage==Page.PAGE_MAIN           ?'active':''}><LinkButton value="Home"      handleClick={navBarClick} nav={Page.PAGE_MAIN           } /></li>
                    {loggedInOptions}
                    <li key='navbar-questions' className={currentPage==Page.PAGE_QUESTION_VIEWER?'active':''}><LinkButton value="Questions" handleClick={navBarClick} nav={Page.PAGE_QUESTION_VIEWER} /></li>
              </ul>

              <ul key='navbar-right' className="nav navbar-nav navbar-right">
                    { userOptions }
              </ul>

            </div>
          </div>
        </nav>
  )
}

//-------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    return {
        currentPage: state.navigation.currentPage
    }
}

//-------------------------------------------------------------------------------

const mapDispatchToProps = (dispatch) => ({
    navBarClick(childProps,val) {
        dispatch(changePage(childProps.nav))
    },
})

//-------------------------------------------------------------------------------

export const NavigationBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationBarPresentation)

//===============================================================================


