// home page

var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery');
var chai = require('chai')
import { Provider,connect } from 'react-redux'

var {
        BooleanChoice,
        RadioChoices,
        TextField,
        ClickableButton,
        ProgressBar
    } = require('./editorComponents')
var {choices, choices_context} = require('./applicationData')

import {
    moveCursorAction,
    setField
    } from './actionTypesAnswerEditor'

var log = require('./loggingConfig').CreateLogger("AnswerEdit")

//===============================================================================

const HomePagePresentation = ({questions, navigationState }) => {
    log.info("HomePage: navigationState",JSON.stringify(navigationState))

    return (
        <div>
            Home page
        </div>
    )
}

//===============================================================================

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        navigationState: state.navigation,
    }
}

//-------------------------------------------------------------------------------

export const HomePage = connect(
  mapStateToProps,
)(HomePagePresentation)

//===============================================================================

