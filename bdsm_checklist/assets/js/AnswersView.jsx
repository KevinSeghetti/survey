// review answers page

var React = require('react')
var ReactDOM = require('react-dom')
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')
var {BooleanChoice, RadioChoices, TextField} = require('./viewerComponents')
var {BooleanChoice: EditBooleanChoice, RadioChoices: EditRadioChoices, TextField:EditTextField} = require('./editorComponents')
var {ContextAnswer: ContextAnswerEdit} = require('./AnswersEdit')
var {choices, choices_context} = require('./applicationData')
import { ACTION_LOAD,ACTION_SET_SEARCH_STRING } from './actionTypes'
var log = require('./loggingConfig').CreateLogger("AnswerView")

//===============================================================================

var ContextFilters = React.createClass({
  getInitialState: function() {
   //log.info("ContextAnswer:initial state",this.props)

   var answers = {
     context: this.props.context,

   }
   if('answers' in this.props && typeof this.props.answers != 'undefined')
   {
     answers = this.props.answers
   }
   //log.info("answers",answers)
   return { answers: answers }
  },

  render: function() {
       log.info("ContextAnswer:render: state = ",this.state,", props = ",this.props)

      var rating

      // kts smell there must be a better way to do this
      if(this.state.answers)
      {
        rating = this.state.answers.rating

      }
      //log.info("ContextAnswer")
      log.info("ContextAnswer: booleans",choices.booleans)
      var that = this
      var choiceNodes = choices.booleans.map(function(choice) {
      //log.info("ContextAnswer: booleans: choice",choice)
        // look up answer, if present
        var answer
        if(that.state.answers && choice.name in that.state.answers)
        {
          answer = that.state.answers[choice.name]
        }

        return (
          <EditBooleanChoice choice={choice} key={choice.name} onUpdate={that.onUpdate}  answer={answer}  parentField={choice.name} />
        )
      })

      var ratingNodes = choices.rating.map(function(choice) {
      //log.info("ContextAnswer: booleans: choice",choice)
        // look up answer, if present
        var answer
        if(that.state.answers && choice.name in that.state.answers)
        {
          answer = that.state.answers[choice.name]
        }

        return (
          <EditBooleanChoice choice={choice} key={choice.name} onUpdate={that.onUpdate}  answer={answer}  parentField={choice.name} />
        )
      })



      var context = $.grep(choices_context, function(e) { return e.name == that.state.answers.context })[0]
      return (
          <div className="answer" onBlur={this.onBlur} >
            <div className='context-headline row'>
                <div className='col-xs-12' >
                  { context.description }
                </div>
            </div>
            <div className="row">
               <div className="col-xs-12 col-sm-12 col-md-6">
                  <div className='row'>
                     <div className="col-xs-12">
                        <div className='row' >
                           <div className='question-headline col-xs-1'>
                           </div>
                           <div className='question-headline col-xs-1'>
                             Rating
                           </div>
                           {ratingNodes}
                        </div>
                     </div>
                  </div>
                  <div className='row'>
                     <div className="col-xs-12">
                         <div className='row' >
                           <div className='col-xs-2'>
                           </div>
                           <div className='col-xs-10' >
                              <div className='booleans' >
                                {choiceNodes}
                              </div>
                           </div>
                         </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
      )
   },
})


//===============================================================================

var Filters = React.createClass({
  render: function() {
    log.info("Answer: props",this.props)

  var that = this
  var contextNodes = choices_context.map(function(context) {
    var context_name = context['name']
    // look up answer, if present
    var answers
    if(that.props.answers &&  context_name in that.props.answers)
    {
      answers = that.props.answers[context_name]
    }

    return (
      <ContextFilters
        context={context_name}
        context_description={context['description']}
        answers={ answers    }
        id={that.props.id + '_'+context_name }
        key={context_name}
      />
    )
  })

  return (
      <div className={this.props.parity} >
        <div className="row" >
            <div className='col-xs-12'>
              <div className='topic-headline'>Filters</div>
            </div>
        </div>
        { contextNodes }
     </div>
  )
  }
})


//===============================================================================

const ContextAnswer = ({ id, answers }) => {
    log.trace("ContextAnswer:render:")
    chai.expect(answers).to.exist

    var choiceNodes = choices.booleans.map(function(choice) {
    log.trace("ContextAnswer: booleans: choice",choice)
    log.trace("ContextAnswer: booleans: answers",answers)

      return (
        <BooleanChoice choice={choice} key={choice.name} answer={answers[choice.name]}  parentField={choice.name} />
      )
    })
    var context = $.grep(choices_context, function(e) { return e.name == answers.context })[0]

    return (
        <div className="answer col-xs-5"  >
          <div className="row" >
            <div className="col-xs-10">
               <div className='row'>
                  <div className="col-xs-3">
                    <RadioChoices choices={choices.rating} selected={answers.rating} id={id + '_rating' }  parentField='rating' />
                  </div>
                  <div className='col-xs-9' >
                     <div className='booleans' >
                       {choiceNodes}
                     </div>
                  </div>
               </div>
               <div className='row'>
                  <div className="col-xs-12">
                    <TextField value={answers.notes} parentField='notes'/>
                  </div>
               </div>
            </div>
          </div>
        </div>
    )
}

//===============================================================================

const Answer = ({id, question, answers,parity  }) => {

  var contextNodes = choices_context.map(function(context) {
    var context_name = context['name']
    var context_answers = answers[context_name]

    log.trace("Answer::render:contextNode(",context_name,")")

    if(context_answers)
    {
      chai.expect(context_answers).to.exist
        return (
          <ContextAnswer
            choices={choices}
            answers={ context_answers }
            question_id={ question.id}
            id={id + '_'+context_name }
            key={context_name}
          />
        )
    }
    return( null )
  })

  log.trace("Answer::render: final")

  return (
      <div className={parity} >
        <div className="row" >
            <div className='col-xs-2'>
              <div className='topic-headline tooltipster_tooltip' title={ question.question_detail } >{ question.question_text   }</div>
            </div>
            { contextNodes }
        </div>
     </div>
  )
}

//===============================================================================

const AnswerList = ({ data }) => {
    log.trace("AnswerList:render:")
    var answerNodes = data.results.map(function(node,index) {
        var parity = 'odd'
        if(index % 2)
        {
          parity = 'even'
        }

        log.trace("AnswerList:render: node = ",JSON.stringify(node))
        if(node.answers)
        {
            log.trace("AnswerList:render: node answers = ",node.answers)

            let key = String(node.question.id)+parity
            log.trace("AnswerList:render:key ",key,"question text",node.question.question_text)

            return (
            <Answer
                question={node.question}
                key={key}
                id={node.question.id}
                answers={node.answers}
                parity={parity}
            />
            )
        }
        return ( null )
    })

    var headerNodes = choices_context.map(function(context) {
        return(
        <div className="col-xs-5 context-headline" key={context.name}>
            {context.description}
        </div>
        )
    })

    return (
      <div className="answerList">
        <div className='row'>
          <div className="col-xs-2 context-headline">
              Questions
          </div>
          {headerNodes}
        </div>
        {answerNodes}
      </div>
    )
}

//===============================================================================

export const AnswerPage = ({ data }) => {
    return(
    <div>
        <div className="answerBox question-reactview">
        <div>
            Select a rating for each question. You don't have to fill this out all
            at once, your progress is saved as you move to the next question.
            So you can come back to the rest later. Select resume to get a
            question list containing only the questions you haven't answered yet.

            Instructions can be found
            <a href="/checklist/instructions"> here</a>
        </div>
         <hr />
          <Filters
          />
          <hr />

          <AnswerList
              data={data}
          />
        </div>
    </div>
  )

}



//===============================================================================


const initialState = {
  questions: []
}

function topReducer(state = initialState, action) {

  switch (action.type) {
  case ACTION_LOAD:
      return Object.assign({}, state, {
          questions: action.questions
      })
  default:
    return state
  }
}



const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

//===============================================================================

