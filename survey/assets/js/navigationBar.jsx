// site wide navigation bar

var React = require('react')
var ReactDOM = require('react-dom')
import { Provider,connect } from 'react-redux'
var $ = require('jquery')
var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("NavigationBar")

//===============================================================================

const NavigationBarPresentation = (props,context) => {
    let {state, } = props

    return(
        <div>
            Navigation bar
        </div>
  )
}

//-------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

//-------------------------------------------------------------------------------

export const NavigationBar = connect(
  mapStateToProps
)(NavigationBarPresentation)

//===============================================================================


