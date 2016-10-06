// edit answers page

var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery');
var chai = require('chai')

var {BooleanChoice, RadioChoices, TextField, ClickableButton} = require('./editorComponents')
var {choices, choices_context} = require('./applicationData')
//var log = require('./loggingConfig').CreateLogger("AnswerEdit")
var log = require('./loggingConfig').CreateLogger("AnswerView")

//===============================================================================
// transport controls

const TransportControls = ({ currentQuestion,nextQuestionAction,prevQuestionAction }) => {
    chai.expect(prevQuestionAction).to.exist
    chai.expect(nextQuestionAction).to.exist

    log.trace("TransportControls:render:")
    return(
        <div>
          <ClickableButton
              value="Prev"
              handleClick={prevQuestionAction}
          />
            <p>Current question {currentQuestion+1}</p>
          <ClickableButton
              value="Next"
              handleClick={nextQuestionAction}
          />

        </div>
    )
}

//===============================================================================

// There is a one to one relationship between this component
// and a row in the answer DB on the server
// so this is where we store all state relating to this answer,
// and send it to the server whenever it changes

export var ContextAnswer = React.createClass({
   getInitialState: function() {
    //log.info("ContextAnswer:initial state",this.props)

    var answers = {
      context: this.props.context,
      question: { id: this.props.question_id } ,

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
       var notes

       // kts smell there must be a better way to do this
       if(this.state.answers)
       {
         rating = this.state.answers.rating
         notes  = this.state.answers.notes

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
           <BooleanChoice
            choice={choice}
            key={choice.name}
            onUpdate={that.onUpdate}
            answer={answer}
            parentField={choice.name}
          />
         )
       })
       var context = $.grep(choices_context, function(e) { return e.name == that.state.answers.context })[0]
       return (
           <div className="" onBlur={this.onBlur} >
             <div className='row'>
                 <div className='col-xs-12' >
                   <h3>{ context.description }</h3>
                 </div>
             </div>
             <div className="row">
                <div className="col-xs-12">
                    <RadioChoices
                        label="Rating"
                        choices={choices.rating}
                        selected={rating}
                        id={this.state.id + '_rating' }
                        onUpdate={this.onUpdate}
                        parentField='rating'
                    />
                </div>
             </div>
             <div className='row'>
                <div className="col-xs-12">
                   <h4>Selections</h4>
                   {choiceNodes}
                </div>
             </div>
             <div className='row'>
               <TextField
                   label="Notes"
                   value={notes}
                   onUpdate={this.onUpdate}
                   parentField='notes'
               />
             </div>
           </div>
       )
    },

    onUpdate: function(childProps, val) {
      //log.info('ContextAnswer:onUpdate', childProps.parentField,  val)
      var newState = this.state.answers
      newState[childProps.parentField] = val
      //log.info('ContextAnswer:onUpdate: existing state', this.state)
      //log.info('ContextAnswer:onUpdate: new state', newState)
      this.setState({ answers: newState} )
    },

    onBlur: function(e) {
      var currentTarget = e.currentTarget
      var that = this

      setTimeout(function() {
        if (!currentTarget.contains(document.activeElement)) {
            // this checks to see if whatever is now selected
            // is under this component. If it not, then it is time
            // to save changes to this component
            //log.info('component officially blurred')
            // time to send this object to the server
            that.saveAnswer()
            //log.info('state', that.state)
        }
      }, 0)
    },

    saveAnswer: function(answer) {
      var url = "/rest/answers/"       // for cases where we don't have an answer record yet
      var requestType = 'POST'
      if('url' in this.state.answers)
      {
        url = this.state.answers.url
        requestType = 'PUT'
      }
      var postData = {}
      postData = this.state.answers

        //kts smell
      // csrf setup
      log.info("x crsr",window.globs['csrfToken'])
      $.ajaxSetup({
          headers: {
              'X-CSRFToken': window.globs['csrfToken']
          }
      })

      $.ajax({
        url: url,
        dataType: 'json',
        type: requestType,
        data: postData,
        success: function(data) {
          //log.info("saveAnswer: success: returned data = ",data)
          this.setState({ answers:  data} )
        }.bind(this),
        error: function(xhr, status, err) {
          //this.setState({data: answers})
          console.error(this.props.url, status, err.toString())
        }.bind(this)
      })
    },
})

export var Answer = React.createClass({
  render: function() {
    log.info("Answer: props",JSON.stringify(this.props,null,2))
    let {question,answers} = this.props
    log.info("Answer: question.question_text ",question.question_text )

  var contextNodes = choices_context.map((context) => {
    var context_name = context['name']
    // look up answer, if present
    var contextanswers
    if(answers && context_name in answers)
    {
      contextanswers = answers[context_name]
    }

    return (
      <ContextAnswer
        context={context_name}
        context_description={context['description']}
        answers={ contextanswers    }
        question_id={ question.id}
        id={question.id + '_'+context_name }
        key={context_name}
      />
    )
  })

  return (
      <div className= "panel panel-default" >
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

export const AnswerPage = ({questions, currentQuestion,nextQuestionAction,prevQuestionAction }) => {
    log.info("AnswerPage: currentQuestion",currentQuestion)
    //log.info("AnswerPage: currentQuestion",currentQuestion,", questions: ",JSON.stringify(questions))
    chai.expect(questions).to.exist
    chai.expect(currentQuestion).to.exist
    chai.expect(prevQuestionAction).to.exist
    chai.expect(nextQuestionAction).to.exist
    if(currentQuestion >= questions.length)
    {
      return null
    }

    let question = questions[currentQuestion]
    chai.expect(question).to.exist

    log.info("AnswerPage: rendering ",JSON.stringify(question,null,2))

    return (

      <div className="answerBox question-edit">
      <div>
          Select a rating for each question. You don't have to fill this out all
          at once, your progress is saved as you move to the next question.
          So you can come back to the rest later. Select resume to get a
          question list containing only the questions you haven't answered yet.

          Instructions can be found
          <a href="/checklist/instructions"> here</a>
      </div>
       <hr />

       <Answer
         question={question.question}
         answers={question.answers}
       />

       <TransportControls
         currentQuestion    = { currentQuestion     }
         nextQuestionAction = { nextQuestionAction  }
         prevQuestionAction = { prevQuestionAction  }
       />

      </div>
    )
}




