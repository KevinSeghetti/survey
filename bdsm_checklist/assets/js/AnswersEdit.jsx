// edit answers page

var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery');

var {BooleanChoice, RadioChoices, TextField} = require('./editorComponents')
var {choices, choices_context} = require('./applicationData')
var log = require('./loggingConfig').CreateLogger("AnswerView")

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
           <BooleanChoice choice={choice} key={choice.name} onUpdate={that.onUpdate}  answer={answer}  parentField={choice.name} />
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
                            <RadioChoices choices={choices.rating} selected={rating} id={this.state.id + '_rating' }  onUpdate={this.onUpdate}  parentField='rating' />
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
                <div className='notes col-xs-6'>
                   Notes<TextField value={notes}  onUpdate={this.onUpdate} parentField='notes'/>
                </div>
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
      <ContextAnswer
        context={context_name}
        context_description={context['description']}
        answers={ answers    }
        question_id={ that.props.question.id}
        id={that.props.id + '_'+context_name }
        key={context_name}
      />
    )
  })

  return (
      <div className={this.props.parity} >
        <div className="row" >
            <div className='col-xs-12'>
              <div className='topic-headline'>{ this.props.question.question_text   }</div>
              <div className='topic-detail'  >{ this.props.question.question_detail }</div>
            </div>
        </div>
        { contextNodes }
     </div>
  )
  }
})

var AnswerList = React.createClass({
  render: function() {
    log.info("AnswerList:render: props",this.props)
    var answerNodes = this.props.data.results.map(function(node,index) {
      var parity = 'odd'
      if(index % 2)
      {
        parity = 'even'
      }

      log.info("key ",node.question.id,"question text",node.question.question_text)

      return (
      <Answer
        question={node.question}
        key={String(node.context)+node.question.id}
        id={node.question.id}
        answers={node.answers}
        parity={parity}
      />
      )
    })

    log.info("answer nodes",answerNodes)
    return (
      <div className="answerList">
        {answerNodes}
      </div>
    )
  }
})

export var AnswerBox = React.createClass({
  loadAnswersFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        log.info("== json loaded ==",data)
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  getInitialState: function() {
    return {data: { results: []} }
  },
  componentDidMount: function() {
    this.loadAnswersFromServer()
  },
  render: function() {
       log.info("thisprops",this.props)
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

        <AnswerList
            data={this.state.data}
        />
      </div>
    )
  }
})




