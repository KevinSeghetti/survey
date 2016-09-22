// review answers page

var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery');
var chai = require('chai');
var {BooleanChoice, RadioChoices, TextField} = require('./viewerComponents')
var {choices, choices_context} = require('./applicationData')

var log = require('./loggingConfig').CreateLogger("AnswerView")

//===============================================================================

var ContextAnswer = React.createClass({
   render: function() {
       log.trace("ContextAnswer:render:")
       log.trace("ContextAnswer:render: props = ",JSON.stringify(this.props))
       chai.expect(this.props.answers).to.exist

       var {id, answers} = this.props

       var choiceNodes = choices.booleans.map(function(choice) {
       log.trace("ContextAnswer: booleans: choice",choice)
       log.trace("ContextAnswer: booleans: answers",answers)

         return (
           <BooleanChoice choice={choice} key={choice.name} answer={answers[choice.name]}  parentField={choice.name} />
         );
       });
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
       );
    },

});

//===============================================================================

var Answer = React.createClass({
  render: function() {
    log.trace("Answer::render: props",JSON.stringify(this.props))
    var { id, question, answers,parity } = this.props

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
          );

      }
      return (
        null
      );

    });

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
    );
  }
});

//===============================================================================

var AnswerList = React.createClass({
  render: function() {
    log.trace("AnswerList:render: props",this.props)
    var answerNodes = this.props.data.results.map(function(node,index) {
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
        );
      }

      return ( null
      );
    });

    log.trace("answer nodes",answerNodes)

    var headerNodes = choices_context.map(function(context) {

        return(
        <div className="col-xs-5 context-headline">
            {context.description}
        </div>

        )
    })


    log.trace("header nodes",headerNodes)

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
    );
  }
});

//===============================================================================

export var AnswerBox = React.createClass({
    loadAnswersFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                log.trace("== json loaded ==",data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: { results: []} };
    },
    componentDidMount: function() {
        this.loadAnswersFromServer();
    },
    render: function() {
        log.trace("AnswerBox::render: props",this.props,", state = ",this.state)
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
        );
  }
});

//===============================================================================




