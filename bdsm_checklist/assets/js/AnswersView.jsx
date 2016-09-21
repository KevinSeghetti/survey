
var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery');
var chai = require('chai');
var {BooleanChoice, RadioChoices, TextField} = require('./viewerComponents')
var log = require('./loggingConfig').CreateLogger("AnswerView")

var ContextAnswer = React.createClass({
   render: function() {
        log.info("ContextAnswer:render: props = ",this.props)

       log.info("ContextAnswer")
       log.info("ContextAnswer: booleans",this.props.choices.booleans)

       chai.expect(this.props.answers).to.exist

       var that = this
       var choiceNodes = this.props.choices.booleans.map(function(choice) {
       log.info("ContextAnswer: booleans: choice",choice)
       log.info("ContextAnswer: booleans: answers",that.props.answers)

         return (
           <BooleanChoice choice={choice} key={choice.name} answer={that.props.answers[choice.name]}  parentField={choice.name} />
         );
       });
       var context = $.grep(this.props.choices_context, function(e) { return e.name == that.props.answers.context })[0]


       return (
           <div className="answer"  >
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
                            <RadioChoices choices={this.props.choices.rating} selected={this.props.answers.rating} id={this.props.id + '_rating' }  parentField='rating' />
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
                   <b>Notes</b><TextField value={this.props.answers.notes} parentField='notes'/>
                </div>
             </div>
           </div>
       );
    },

});

var Answer = React.createClass({
  render: function() {
    log.info("Answer::render: props",this.props)

  var that = this
  var contextNodes = this.props.choices_context.map(function(context) {
    var context_name = context['name']
    var answers = that.props.answers[context_name]

    log.info("Answer::render:contextNode(",context_name,")")

    if(answers)
    {
      chai.expect(answers).to.exist
        return (
          <ContextAnswer
            choices={that.props.choices}
            choices_context={that.props.choices_context}
            context={context_name}
            context_description={context['description']}
            answers={ that.props.answers[context_name] }
            question_id={ that.props.question.id}
            id={that.props.id + '_'+context_name }
            key={context_name}
          />
        );

    }
    return (
    <div></div>
    );

  });

  log.info("Answer::render: final")

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
  );
  }
});

var AnswerList = React.createClass({
  render: function() {
    log.info("AnswerList:render: props",this.props)
    let choices_context = this.props.choices_context
    let choices = this.props.choices
    var answerNodes = this.props.data.results.map(function(node,index) {
      var parity = 'odd'
      if(index % 2)
      {
        parity = 'even'
      }

      log.info("AnswerList:render: node = ",node)
      log.info("AnswerList:render: node answers = ",node.answers)

      log.info("AnswerList:render:key ",node.question.id,"question text",node.question.question_text)
      if(node.answers)
      {
        return (
        <Answer
          question={node.question}
          key={String(node.context)+node.question.id}
          id={node.question.id}
          answers={node.answers}
          parity={parity}
          choices_context={choices_context}
          choices={choices}
        />
        );
      }

      return (
      <div></div>
      );
    });

    log.info("answer nodes",answerNodes)
    return (
      <div className="answerList">
        {answerNodes}
      </div>
    );
  }
});

export var AnswerBox = React.createClass({
  loadAnswersFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        log.info("== json loaded ==",data);
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
       log.info("AnswerBox::render: props",this.props,", state = ",this.state)
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
            choices_context={this.props.choices_context}
            choices={this.props.choices}
        />
      </div>
    );
  }
});




