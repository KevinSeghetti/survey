// edit answers page

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
    prevQuestionAction,
    nextQuestionAction,
    setField
    } from './actionTypesAnswerEditor'

var log = require('./loggingConfig').CreateLogger("AnswerEdit")


//===============================================================================
// transport controls

const TransportControls = ({ questions, navigationState,nextQuestionAction,prevQuestionAction }) => {
    chai.expect(prevQuestionAction).to.exist
    chai.expect(nextQuestionAction).to.exist
    chai.expect(questions).to.exist
    chai.expect(navigationState).to.exist

    let questionCount = questions.length
    let answeredQuestionCount = questions.reduce(
        (accumulator, obj) =>
            { return accumulator + ('answers' in obj ? 1 : 0) }
        , 0)
    log.trace("TransportControls:render:")
    return(
        <div className="btn-toolbar">
            <div className="btn-toolbar">
                <div className="btn-group" role="group" aria-label="...">
                    <ClickableButton
                        icon="glyphicon glyphicon-step-backward"
                        handleClick={prevQuestionAction}
                    />
                </div>
                <div className="btn-group" role="group" aria-label="...">
                      <span className="form-control-static">Current question {navigationState.currentQuestion+1} of {questionCount} (of {answeredQuestionCount} answered questions)</span>
                </div>
                <div className="btn-group" role="group" aria-label="...">
                    <ClickableButton
                        icon="glyphicon glyphicon-step-forward"
                        handleClick={nextQuestionAction}
                    />

                </div>
            </div>
            <div >
                <ProgressBar
                    value={answeredQuestionCount }
                    handleClick={nextQuestionAction}
                />
            </div>

        </div>
    )
}

//-------------------------------------------------------------------------------

const transportControlsMapStateToProps = (state) => {
    return {
    }
}

//-------------------------------------------------------------------------------

const transportControlsMapDispatchToProps = (dispatch) => ({
    prevQuestionAction() {
        dispatch(prevQuestionAction() )
    },
    nextQuestionAction() {
        dispatch(nextQuestionAction() )
    },
})

//-------------------------------------------------------------------------------

const TransportControlsWrapper = connect(
  transportControlsMapStateToProps,
  transportControlsMapDispatchToProps
)(TransportControls)


//===============================================================================

// There is a one to one relationship between this component
// and a row in the answer DB on the server

export var ContextAnswer = React.createClass({
   render: function() {
        log.info("ContextAnswer:render: props = ",JSON.stringify(this.props))
        let {onUpdate,id, questionId, context  } = this.props
        chai.expect(onUpdate).to.exist

        var answers = {
          context: context,
          question: { id: questionId } ,

        }
        if('answers' in this.props && typeof this.props.answers != 'undefined')
        {
          answers = this.props.answers
        }
       var rating
       var notes

       // kts smell there must be a better way to do this
       if(answers)
       {
         rating = answers.rating
         notes  = answers.notes

       }
       //log.info("ContextAnswer")
       //log.info("ContextAnswer: booleans",choices.booleans)
       var choiceNodes = choices.booleans.map( (choice) => {
       //log.info("ContextAnswer: booleans: choice",choice)
         // look up answer, if present
         var answer
         if(answers && choice.name in answers)
         {
           answer = answers[choice.name]
         }

         return (
           <BooleanChoice
            choice={choice}
            key={choice.name}
            onUpdate={onUpdate}
            questionId={questionId}
            context={context}
            answer={answer}
            parentField={choice.name}
          />
         )
       })
       chai.expect( answers.context ).to.exist
       var answersContext = $.grep(choices_context, function(e) { return e.name == answers.context })[0]
       return (
           <div >
             <div className='row'>
                 <div className='col-xs-12' >
                   <h3>{ answersContext.description }</h3>
                 </div>
             </div>
             <div className="row">
                <div className="col-xs-12">
                    <RadioChoices
                        label="Rating"
                        choices={choices.rating}
                        selected={rating}
                        id={id + '_rating' }
                        questionId={questionId}
                        context={context}
                        onUpdate={onUpdate}
                        parentField='rating'
                    />
                </div>
             </div>
             <div className='form-group' >
               <label className="col-sm-4 control-label">Selections</label>
               <div className="col-sm-8">
                   {choiceNodes}
               </div>
             </div>
             <div className='row'>
               <TextField
                   label="Notes"
                   value={notes}
                   onUpdate={onUpdate}
                   context={context}
                   questionId={questionId}
                   parentField='notes'
               />
             </div>
           </div>
       )
    },

})

//===============================================================================

const contextAnswerMapStateToProps = (state) => {
    //log.trace("mapStateToProps: state = ",JSON.stringify(state,null,2))
    //log.trace("mapStateToProps: state type = ",typeof(state))
    return {
        state: state
    }
}

//-------------------------------------------------------------------------------

const contextAnswerMapDispatchToProps = (dispatch) => ({
    onUpdate(childProps, value) {
        let {questionId, context, parentField} = childProps
        chai.expect(questionId).to.exist
        chai.expect(context).to.exist
        chai.expect(parentField).to.exist
        chai.expect(value).to.exist

        dispatch(setField(questionId, context, parentField, value) )
    },
})

//-------------------------------------------------------------------------------

const ContextAnswerWrapper = connect(
  contextAnswerMapStateToProps,
  contextAnswerMapDispatchToProps
)(ContextAnswer)

//===============================================================================


export var Answer = React.createClass({
  render: function() {
    log.info("Answer: props",JSON.stringify(this.props,null,2))
    let {question,answers} = this.props
    log.info("Answer: question.id ",question.id )

  var contextNodes = choices_context.map((context) => {
    var context_name = context['name']
    // look up answer, if present
    var contextanswers
    if(answers && context_name in answers)
    {
      contextanswers = answers[context_name]
    }

    return (
      <ContextAnswerWrapper
        context={context_name}
        context_description={context['description']}
        answers={ contextanswers    }
        questionId={ question.id}
        id={question.id + '_'+context_name }
        key={context_name}
      />
    )
  })

  return (
      <div className= "panel panel-default" id={question.id}  >
        <div className="panel-heading" >
              <h2>
                { question.question_text }
                &nbsp;<small>{ question.question_detail }</small>
             </h2>
        </div>
        <div className="panel-body" >
            { contextNodes }
        </div>
     </div>
  )
  }
})

//===============================================================================

const AnswerPage = ({questions, navigationState }) => {
    log.info("AnswerPage: navigationState",JSON.stringify(navigationState))
    //log.info("AnswerPage: navigationState",JSON.stringify(navigationState), questions: ",JSON.stringify(questions))
    chai.expect(questions).to.exist
    chai.expect(navigationState).to.exist
    if(navigationState.currentQuestion >= questions.length)
    {
      return null
    }

    let question = questions[navigationState.currentQuestion]
    chai.expect(question).to.exist

    log.info("AnswerPage: rendering ",JSON.stringify(question,null,2))

    return (
      <form className="form-horizontal">
          <TransportControlsWrapper
            questions        = { questions }
            navigationState  = { navigationState }
          />

          <Answer
            question={question.question}
            answers={question.answers}
          />

          <div>
              Select a rating for each question. You don't have to fill this out all
              at once, your progress is saved as you move to the next question.
              So you can come back to the rest later. Select resume to get a
              question list containing only the questions you haven't answered yet.

              Instructions can be found
              <a href="/checklist/instructions"> here</a>
          </div>
      </form>
    )
}

//===============================================================================

const answerPageMapStateToProps = (state) => {
    log.trace("answerPageMapStateToProps: ")
    //log.trace("mapStateToProps: state = ",JSON.stringify(state,null,2))
    return {
        questions: state.questions,
        navigationState: state.navigation,
    }
}

//-------------------------------------------------------------------------------

export const AnswerApp = connect(
  answerPageMapStateToProps,
)(AnswerPage)

//===============================================================================

