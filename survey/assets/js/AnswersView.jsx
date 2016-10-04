// react version of review answers page

var React = require('react')
var ReactDOM = require('react-dom')
import { createStore } from 'redux'
var $ = require('jquery')
var chai = require('chai')

//-------------------------------------------------------------------------------

var {BooleanChoice, RadioChoices, TextField} = require('./viewerComponents')
var {BooleanChoice: EditBooleanChoice, RadioChoices: EditRadioChoices, TextField:EditTextField} = require('./editorComponents')
var {ContextAnswer: ContextAnswerEdit} = require('./AnswersEdit')
var {choices, choices_context} = require('./applicationData')
var log = require('./loggingConfig').CreateLogger("AnswerView")

//===============================================================================

var ContextFilters = React.createClass({
  render: function() {
      log.info("ContextAnswer:render: props = ",JSON.stringify(this.props))
      chai.expect(this.props.onRatingFilterClick).to.exist
      chai.expect(this.props.onBooleanFilterClick).to.exist
      let { filterState } = this.props

      //log.info("ContextAnswer")
      log.info("ContextAnswer: booleans",choices.booleans)
      var that = this
      var choiceNodes = choices.booleans.map(function(choice) {
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
            key={choice.name}
            id={choice.name}
            onUpdate={that.onBooleanUpdate}
            answer={answer}
            parentField={choice.name}
          />
        )
      })

      var ratingNodes = choices.rating.map(function(choice) {
      //log.info("ContextAnswer: booleans: choice",choice)
        // look up answer, if present
        var answer
        if(filterState && 'rating' in filterState && choice.name in filterState.rating)
        {
          answer = filterState.rating[choice.name]
        }
        log.info("ContextFilters: rating: answer",answer)

        return (
          <EditBooleanChoice
            choice={choice}
            key={choice.name}
            id={choice.name}
            onUpdate={that.onRatingUpdate}
            answer={answer}
            parentField={choice.name}
          />
        )
      })

      return (
          <div className="answer col-xs-12" onBlur={this.onBlur} >
            <div className='row'>
               <div className="col-xs-12">
                  <div className='row' >
                     <div className='question-headline col-xs-2'>
                       Rating
                     </div>
                     {ratingNodes}
                  </div>
               </div>
            </div>
            <div className='row'>
               <div className="col-xs-12">
                 <div className='booleans' >
                   {choiceNodes}
                 </div>
               </div>
            </div>
          </div>
      )
   },

  onRatingUpdate: function(childProps, val) {

    //log.info('ContextAnswer:onUpdate', childProps.id,  val)
    //log.info('ContextAnswer:onUpdate:this.props', JSON.stringify(this.props))
    //log.info('ContextAnswer:onUpdate:childProps', JSON.stringify(childProps))
    this.props.onRatingFilterClick( this.props.context, childProps.id )
  },
  onBooleanUpdate: function(childProps, val) {

    log.info('ContextAnswer:onUpdate', childProps.id,  val)
    log.info('ContextAnswer:onUpdate:this.props', JSON.stringify(this.props))
    log.info('ContextAnswer:onUpdate:childProps', JSON.stringify(childProps))

    this.props.onBooleanFilterClick( this.props.context, childProps.id )
  },
})

//===============================================================================

var Filters = React.createClass({
  render: function() {
    log.info("Answer::render props",JSON.stringify(this.props))
    chai.expect(this.props.onRatingFilterClick).to.exist
    chai.expect(this.props.onBooleanFilterClick).to.exist
    let {filterState,onRatingFilterClick,onBooleanFilterClick,parity} = this.props

    log.info("Answer::render filterState",JSON.stringify(filterState))
  // TODO update to fat arrow function
  var that = this
  var contextNodes = choices_context.map(function(context) {
    var context_name = context['name']
    let contextFilterState = filterState[context_name]

    log.info("Answer::render contextFilterState",JSON.stringify(contextFilterState))
    log.info("Answer::render context_name",context_name)

    return (
      <div className="col-xs-5"  key={context_name} >
        <ContextFilters
          filterState={contextFilterState}
          onRatingFilterClick= {onRatingFilterClick}
          onBooleanFilterClick={onBooleanFilterClick}
          context={context_name}
          context_description={context['description']}
        />
      </div>
    )
  })

  var headerNodes = choices_context.map(function(context) {
      return(
      <div className="col-xs-5 context-headline" key={context.name}>
          {context.description}
      </div>
      )
  })

  return (
      <div className={parity} >
        <div className="row" >
          <div className="col-xs-2 context-headline">
              Filters
          </div>
          {headerNodes}
        </div>
        <div className="row" >
          <div className="col-xs-2">
          </div>
          { contextNodes }
        </div>
     </div>
  )
  }
})

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
                    <RadioChoices
                      choices={choices.rating}
                      selected={answers.rating}
                      id={id + '_rating' }
                      parentField='rating'
                    />
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

const Answer = ({id, question, answers,parity,filters  }) => {
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
  return null
}

//===============================================================================

const AnswerList = ({ questions, filters }) => {
    log.trace("AnswerList:render:")
    let rowIndex = 0
    var answerNodes = questions.map(function(node,index) {
        var parity = 'odd'
        if(rowIndex % 2)
        {
          parity = 'even'
        }

        //log.trace("AnswerList:render: node = ",JSON.stringify(node))
        if(node.answers)
        {
            log.trace("AnswerList:render: node answers = ",node.answers)

            let key = String(node.question.id)+parity
            log.trace("AnswerList:render:key ",key,"question text",node.question.question_text)

            let renderThisAnswer = false
            var contextNodes = choices_context.map(function(context) {
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
                  parity={parity}
                  filters={filters}
              />
              )
            }
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

export const AnswerPage = (props) => {
    log.info(' AnswerPage: toggle', JSON.stringify(props))
    let { data, toggleRatingFilterAction, toggleBooleanFilterAction } = props
    log.info(' AnswerPage: test', JSON.stringify(toggleRatingFilterAction))

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
              onRatingFilterClick ={toggleRatingFilterAction}
              onBooleanFilterClick={toggleBooleanFilterAction}
              filterState={data.filters}

          />
          <hr />

          <AnswerList
              questions={data.questions}
              filters={data.filters}
          />
        </div>
    </div>
  )

}

//===============================================================================

