// react version of review answers page

var React = require('react')
var ReactDOM = require('react-dom')
import { createStore } from 'redux'
import { Provider,connect } from 'react-redux'

var $ = require('jquery')
var chai = require('chai')

//-------------------------------------------------------------------------------

var {BooleanChoice, RadioChoices, TextField} = require('./viewerComponents')
var {BooleanChoice: EditBooleanChoice, RadioChoices: EditRadioChoices, TextField:EditTextField, ClickableButton} = require('./editorComponents')
var {ContextAnswer: ContextAnswerEdit} = require('./AnswersEdit')
var {choices, choices_context} = require('./applicationData')
import {
    toggleBooleanFilterAction,
    toggleRatingFilterAction,
    clearBooleanFilterAction,
    clearRatingFilterAction,
    } from './actionTypesAnswerViewer'

var log = require('./loggingConfig').CreateLogger("AnswerView")

//===============================================================================

var ContextFilters = React.createClass({
  render: function() {
      log.info("ContextAnswer:render: props = ",JSON.stringify(this.props))
      chai.expect(this.props.toggleRatingFilterAction).to.exist
      chai.expect(this.props.toggleBooleanFilterAction).to.exist
      chai.expect(this.props.clearBooleanFilterAction).to.exist
      chai.expect(this.props.clearRatingFilterAction).to.exist
      let {
          filterState,
          toggleRatingFilterAction  ,
          toggleBooleanFilterAction ,
          clearBooleanFilterAction  ,
          clearRatingFilterAction   ,
          context,

      } = this.props

      //log.info("ContextAnswer")
      //log.info("ContextAnswer: booleans",choices.booleans)
      var choiceNodes = choices.booleans.map( (choice) => {
      //log.info("ContextFilters: booleans: choice",JSON.stringify(choice))
      //log.info("ContextFilters: booleans: filterState",JSON.stringify(filterState))
      // look up answer, if present
      var answer
      if(filterState && 'booleans' in filterState && choice.name in filterState.booleans)
      {
        answer = filterState.booleans[choice.name]
      }
      //log.info("ContextFilters: booleans: answer",answer)

        return (
          <EditBooleanChoice
            choice={choice}
            context={context}
            key={choice.name}
            id={choice.name}
            onUpdate={toggleBooleanFilterAction}
            answer={answer}
            parentField={choice.name}
          />
        )
      })

      var ratingNodes = choices.rating.map((choice) => {
      //log.info("ContextAnswer: booleans: choice",choice)
        // look up answer, if present
        var answer
        if(filterState && 'rating' in filterState && choice.name in filterState.rating)
        {
          answer = filterState.rating[choice.name]
        }
        //log.info("ContextFilters: rating: answer",answer)

        return (
            <EditBooleanChoice
              choice={choice}
              context={context}
              key={choice.name}
              id={choice.name}
              onUpdate={toggleRatingFilterAction}
              answer={answer}
              parentField={choice.name}
            />
        )
      })

      let labelStyle = {
          fontSize: '18px',
          fontWeight:'bold',
      }
      return (
          <div className="col-xs-12" >
            <div className='row'>
              <div className="col-xs-2" >
                  <ClickableButton
                      value="Clear"
                      context={context}
                      handleClick={clearRatingFilterAction}
                  />
              </div>
              <div className='form-group' >
                <span style={labelStyle} >Rating</span>
                {ratingNodes}
              </div>
            </div>
            <div className='row'>
               <div className="col-xs-2" >
                   <ClickableButton
                       value="Clear"
                       context={context}
                       handleClick={clearBooleanFilterAction}
                   />
               </div>
               <div className='form-group' >
                 <span style={labelStyle} >Selections</span>
                 {choiceNodes}
               </div>
            </div>
          </div>
      )
   },
})

//===============================================================================

var Filters = React.createClass({
  render: function() {
    log.info("Answer::render props",JSON.stringify(this.props))
    chai.expect(this.props.toggleRatingFilterAction).to.exist
    chai.expect(this.props.toggleBooleanFilterAction).to.exist
    chai.expect(this.props.clearBooleanFilterAction).to.exist
    chai.expect(this.props.clearRatingFilterAction).to.exist
    let {
            filterState,
            toggleRatingFilterAction  ,
            toggleBooleanFilterAction ,
            clearBooleanFilterAction  ,
            clearRatingFilterAction   ,

         } = this.props

    log.info("Answer::render filterState",JSON.stringify(filterState))
  var contextNodes = choices_context.map( (context) => {
    var context_name = context['name']
    let contextFilterState = filterState[context_name]

    log.info("Answer::render contextFilterState",JSON.stringify(contextFilterState))
    log.info("Answer::render context_name",context_name)

    return (
      <div className="col-xs-6"  key={context_name} >
        <ContextFilters
          filterState={contextFilterState}
          toggleRatingFilterAction   = {toggleRatingFilterAction }
          toggleBooleanFilterAction  = {toggleBooleanFilterAction}
          clearBooleanFilterAction   = {clearBooleanFilterAction }
          clearRatingFilterAction    = {clearRatingFilterAction  }

          context={context_name}
          context_description={context['description']}
        />
      </div>
    )
  })

  var headerDivStyle = {
    fontSize: '16px',
    textAlign: 'center'
  }

  var headerNodes = choices_context.map( (context) => {
      return(
      <div className="col-xs-6" key={context.name} style={headerDivStyle} >
          <h3>{context.description}</h3>
      </div>
      )
  })

    var divStyle = {
      fontSize: '28px',
      textAlign: 'center'
    }
  return (
      <div className='panel panel-default' >
        <div className="panel-heading">
              <h2 className="text-center">Filters</h2>
        </div>
        <div className="panel-body">
            <div className="row" >
                  <div className="col-xs-12"> <p>Uncheck boxes to not show anwers with that value</p></div>
            </div>
            <div className="row" >
              {headerNodes}
            </div>
            <div className="row" >
              { contextNodes }
            </div>
        </div>
     </div>
  )
  },
})


const filterMapStateToProps = (state) => {
    //log.trace("mapStateToProps: state = ",JSON.stringify(state,null,2))
    //log.trace("mapStateToProps: state type = ",typeof(state))
    return {
        state: state
    }
}

//-------------------------------------------------------------------------------

const filterMapDispatchToProps = (dispatch) => ({
    onLoad(data) {
        dispatch(loadAction(data))
    },
    toggleBooleanFilterAction(childProps, val) {
        dispatch(toggleBooleanFilterAction(childProps.context, childProps.id) )
    },
    toggleRatingFilterAction(childProps, val) {
        dispatch(toggleRatingFilterAction(childProps.context, childProps.id) )
    },
    clearRatingFilterAction(childProps, val) {
        dispatch(clearRatingFilterAction(childProps.context) )
    },
    clearBooleanFilterAction(childProps, val) {
        dispatch(clearBooleanFilterAction(childProps.context) )
    },
})

//-------------------------------------------------------------------------------

const FilterView = connect(
  filterMapStateToProps,
  filterMapDispatchToProps
)(Filters)

//===============================================================================

// kts TODO seperate filtering from rendering

function filterContextAnswer(filters, answer) {
    log.trace("filterContextAnswer:")
    //log.trace("filterContextAnswer: filters",JSON.stringify(filters,null,2))
    //log.trace("filterContextAnswer: answer",JSON.stringify(answer,null,2))

    if(filters['rating'][answer.rating])
    {
        return true
    }

    let result = choices.booleans.find( (choice) => {
        let name = choice['name']

        //log.trace("filterContextAnswer: checking boolean",JSON.stringify(choice))
        //log.trace("filterContextAnswer: checking boolean name",name)
        //log.trace("filterContextAnswer: checking boolean name in answer",name in answer)
        //log.trace("filterContextAnswer: checking boolean name in answer[name]",answer[name])

        if(name && name in answer && answer[name]
           && name in filters['booleans'] && filters['booleans'][name]
        )
        {
          log.trace("filterContextAnswer: !!!returnung true")
          return true
        }
        return false
    }) !== undefined
    log.trace("filterContextAnswer: result = ",result)

    return result
}

//===============================================================================

var Answer = React.createClass({
  renderContextAnswer: function({ id, answers }) {
    log.trace("ContextAnswer:render:")
    chai.expect(answers).to.exist

    let columns = []

    var choiceNodes = choices.booleans.map( (choice) => {
    //log.trace("ContextAnswer: booleans: choice",choice)
    //log.trace("ContextAnswer: booleans: answers",answers)

      return (
        <BooleanChoice choice={choice} key={choice.name} answer={answers[choice.name]}  parentField={choice.name} />
      )
    })
    var context = $.grep(choices_context, (e) => { return e.name == answers.context })[0]
    columns.push(
        <td>
            <RadioChoices
              choices={choices.rating}
              selected={answers.rating}
              id={id + '_rating' }
              parentField='rating'
            />
        </td>
    )
    columns.push(
        <td>
            {choiceNodes}
        </td>
    )
    columns.push(
        <td>
              <TextField value={answers.notes} parentField='notes'/>
        </td>

    )
    return columns

  },
  render: function() {
      let {id, question, answers,filters  } = this.props
      var contextNodes = choices_context.map( (context) => {
        var context_name = context['name']
        var context_answers = answers[context_name]

        log.trace("Answer::render:contextNode(",context_name,")")

        if(context_answers)
        {
          chai.expect(context_answers).to.exist
            return (  this.renderContextAnswer(
                {
                    'answers':context_answers,
                    'question_id':question.id,
                    'id': id + '_'+context_name
                })
            )
        }
        return( null )
      })

      log.trace("Answer::render: final")
      return (
          <tr>
              <td
                className='topic-headline tooltipster_tooltip'
                title={ question.question_detail } >
                    <h3>{ question.question_text }&nbsp;
                        <small>{ question.question_detail }</small>
                    </h3>
              </td>
              { contextNodes }
         </tr>
      )
      return null
    }
})

//===============================================================================

const AnswerList = ({ questions, filters }) => {
    log.trace("AnswerList:render:")
    let rowIndex = 0
    var answerNodes = questions.map( (node,index) => {

        //log.trace("AnswerList:render: node = ",JSON.stringify(node))
        if(node.answers)
        {
            log.trace("AnswerList:render: node answers = ",node.answers)

            let key = String(node.question.id)+rowIndex
            log.trace("AnswerList:render:key ",key,"question text",node.question.question_text)

            let renderThisAnswer = false
            var contextNodes = choices_context.map( (context) => {
              var context_name = context['name']
              var context_answers = node.answers[context_name]

              log.trace("Answer::render:contextNode(",context_name,")")

              if(context_answers && filterContextAnswer(filters[context_name], context_answers))
              {
                renderThisAnswer = true
              }
            })

            if(renderThisAnswer)
            {
              rowIndex += 1
              return (
              <Answer
                  question={node.question}
                  key={key}
                  id={node.question.id}
                  answers={node.answers}
                  filters={filters}
              />
              )
            }
        }
        return ( null )
    })

    var headerNodes = choices_context.map( (context) => {
        return(
        <th key={context.name} colSpan='3' >
            {context.description}
        </th>
        )
    })

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Questions</th>
            {headerNodes}
          </tr>
        </thead>
        <tbody>
          {answerNodes}
        </tbody>
      </table>
    )
}

//===============================================================================

const AnswerPage = (props,context) => {
    console.log("props",props)
    console.log("context",context)
    log.info(' AnswerPage: props', JSON.stringify(props,null,2))
    let {state, } = props

    return(
        <div>
            <FilterView
                filterState={state.filters}
            />
            <AnswerList
                questions={state.questions}
                filters={state.filters}
            />
        </div>
  )
}

//-------------------------------------------------------------------------------

const answerPageMapStateToProps = (state) => {
    return {
        state: state
    }
}

//-------------------------------------------------------------------------------

export const AnswerApp = connect(
  answerPageMapStateToProps
)(AnswerPage)

//===============================================================================

