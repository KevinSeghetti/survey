var React = require('react')
import { render } from 'react-dom'
import { Provider,connect } from 'react-redux'
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

var log = require('./loggingConfig').CreateLogger("answers_view")

var AnswerPage = require('./AnswersView').AnswerPage

var {choices, choices_context} = require('./applicationData')
import { ACTION_LOAD,ACTION_SET_BOOLEAN_FILTER,ACTION_SET_RATING_FILTER,ACTION_SET_SEARCH_STRING } from './actionTypes'
import { loadAction, toggleBooleanFilterAction,  toggleRatingFilterAction } from './actionTypes'
import { mapObject } from './utilities'
var AnswerPage = require('./AnswersView').AnswerPage

var url=window.globs['questionsUrl']

//===============================================================================

const initialState = {
  questions: [],
  filters:
  {
      'to_me': {
          booleans: {},
          rating: {}
      },
      'to_others': {
          booleans: {},
          rating: {}
      }
  }
}


//-------------------------------------------------------------------------------

function contextBooleanFilterReducer(state,action) {
    log.trace("contextlBooleanFilterReducer: filter state = ",JSON.stringify(state,null,2))
    let newValue = true
    if(action.id in state) {
        newValue = !state[action.id]
    }
    let result = Object.assign({}, state, { [action.id] : newValue })
    log.debug("contextBooleanFilterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
    return result

}

function contextRatingFilterReducer(state,action) {
    log.trace("contextlBooleanFilterReducer: filter state = ",JSON.stringify(state,null,2))
    let newValue = true
    if(action.rating in state) {
        newValue = !state[action.rating]
    }
    let result = Object.assign({}, state, { [action.rating] : newValue })
    log.debug("contextBooleanFilterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
    return result

}

function contextFilterReducer(state,action) {
    log.trace("contextFilterReducer: filter state = ",JSON.stringify(state,null,2))
    switch (action.type) {
        case ACTION_SET_BOOLEAN_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == 'booleans') {
                        return contextBooleanFilterReducer(state[key],action)
                    }
                    return contents
                })
                log.debug("contextFilterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }
        case ACTION_SET_RATING_FILTER:
            {
                let result = mapObject(state, (contents,key) => {
                    if (key == 'rating') {
                        return contextRatingFilterReducer(state[key],action)
                    }
                    return contents
                })
                log.debug("contextFilterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
                return result
            }
        default:
          return state
    }
}

function filterReducer(state,action) {
    log.trace("filterReducer: filter state = ",JSON.stringify(state,null,2))
    switch (action.type) {
        case ACTION_SET_BOOLEAN_FILTER:
        case ACTION_SET_RATING_FILTER:
            let result = mapObject(state, (contents,key) => {
                if (key == action.context) {
                    return contextFilterReducer(state[key],action)
                }
                return contents
            })
            log.debug("filterReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
            return result

        default:
          return state
    }
}

function topReducer(state = initialState, action) {

    log.trace("topReducer: ",JSON.stringify(action,null,2))
    switch (action.type) {
    case ACTION_LOAD:

        return Object.assign({}, state, {
            questions: action.data.results
        })
    case ACTION_SET_BOOLEAN_FILTER:
    case ACTION_SET_RATING_FILTER:
        let result = Object.assign({}, state, {
          filters: filterReducer(state.filters, action)
        })
        log.debug("topReducer:ACTION_SET_BOOLEAN_FILTER: result ",JSON.stringify(result,null,2))
        return result
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
        log.trace("AnswerBox::render: props",JSON.stringify(this.props,null,2))
        return (
            <AnswerPage
                data={this.props.data}
                toggleRatingFilterAction  = { this.props.toggleRatingFilterAction }
                toggleBooleanFilterAction = { this.props.toggleBooleanFilterAction}
            />
        )
  }
})


const mapStateToProps = (state) => {
    log.trace("mapStateToProps: state = ",JSON.stringify(state,null,2))
    return {
        data: state
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onLoad: (data) => {
          dispatch(loadAction(data))
      },
      toggleBooleanFilterAction: (context, filter) => {
          dispatch(toggleBooleanFilterAction(context, filter) )
      },
      toggleRatingFilterAction: (context, rating) => {
          dispatch(toggleRatingFilterAction(context, rating) )
      },
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

