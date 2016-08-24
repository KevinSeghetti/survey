// this script is getting transpiled at load time

var BooleanChoice = React.createClass({

  handleChange: function(event) {
    //console.log("BooleanChoice:handleChange:",event.target)
    //console.log("BooleanChoice:handleChange: props",this.props)
    this.props.onUpdate(this.props, !this.props.answer)
  },

  render: function() {
    var checked  = false
    if(this.props.answer)
    {
      checked=true
    }

    return (
        <div className='question small'>
            <input
                type="checkbox"
                checked={checked}
                onChange={this.handleChange}
            />
            {this.props.choice.description}
        </div>
    );
  }
});

var RadioChoices = React.createClass({
  getInitialState: function() {
    return {selected: this.props.selected};
  },
  handleChange: function(event) {
    //console.log("RadioChange:handleChange")
    this.props.onUpdate(this.props, event.target.value)

  },
  render: function() {
    //console.log("RadioChoices:render",this.props)
    var that = this
    var choiceNodes = this.props.choices.map(function(choice) {
      var selected = that.props.selected == choice.name
      return (
          <span key={ that.props.name + '_' + choice.name }>
            <input type="radio"   value={choice.name}
              checked={selected}
              onChange={that.handleChange}
            ></input>
            <label >{choice.description}</label>
          </span>
      );
    });
    return (
      <div className='col-xs-10' >
        {choiceNodes}
      </div>
    );
  }
});


var TextField = React.createClass({
  handleChange: function(event) {
    //console.log("TextField:handleChange")
    this.props.onUpdate(this.props, event.target.value)
  },
  render: function() {
    return (
      <input
        type="text"
        value={ this.props.value }
        onChange={this.handleChange}
      />
    );
  }
});


var ContextAnswer = React.createClass({
   getInitialState: function() {
    //console.log("ContextAnswer:initial state",this.props)

    var answers = {
      context: this.props.context,
      question: { id: this.props.question_id } ,

    }
    if('answers' in this.props && typeof this.props.answers != 'undefined')
    {
      answers = this.props.answers
    }
    //console.log("answers",answers)
    return { answers: answers }
   },

   render: function() {
        //console.log("ContextAnswer:render: state = ",this.state)

       var rating
       var notes

       // kts smell there must be a better way to do this
       if(this.state.answers)
       {
         rating = this.state.answers.rating
         notes  = this.state.answers.notes

       }
       //console.log("ContextAnswer")
       //console.log("ContextAnswer: booleans",choices.booleans)
       var that = this
       var choiceNodes = choices.booleans.map(function(choice) {
       //console.log("ContextAnswer: booleans: choice",choice)
         // look up answer, if present
         var answer
         if(that.state.answers && choice.name in that.state.answers)
         {
           answer = that.state.answers[choice.name]
         }

         return (
           <BooleanChoice choice={choice} key={choice.name} onUpdate={that.onUpdate}  answer={answer}  parentField={choice.name} />
         );
       });
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
       );
    },

    onUpdate: function(childProps, val) {
      //console.log('ContextAnswer:onUpdate', childProps.parentField,  val)
      var newState = this.state.answers
      newState[childProps.parentField] = val
      //console.log('ContextAnswer:onUpdate: existing state', this.state)
      //console.log('ContextAnswer:onUpdate: new state', newState)
      this.setState({ answers: newState} )
    },

    onBlur: function(e) {
      var currentTarget = e.currentTarget;
      var that = this

      setTimeout(function() {
        if (!currentTarget.contains(document.activeElement)) {
            //console.log('component officially blurred');
            // time to send this object to the server
            that.saveAnswer()
            //console.log('state', that.state)
        }
      }, 0);
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

      $.ajax({
        url: url,
        dataType: 'json',
        type: requestType,
        data: postData,
        success: function(data) {
          //console.log("saveAnswer: success: returned data = ",data);
          this.setState({ answers:  data} );
        }.bind(this),
        error: function(xhr, status, err) {
          //this.setState({data: answers});
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
});

var Answer = React.createClass({
  render: function() {
    //console.log("Answer: props",this.props)

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
      );
    });

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

var AnswerBox = React.createClass({
  loadAnswersFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
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
    //setInterval(this.loadAnswersFromServer, this.props.pollInterval);
  },
  render: function() {
    return (

      <div className="answerBox question-edit">
      <div>
          Select A rating for each question. You don't have to fill this out all at once, you can save your progress
          and come back to the rest later. (select resume to get a question list containing only the questions
          you haven't answered yet.

          Instructions can be found <a href="/static/checklist/instructions.html">
          here
          </a>
      </div>
       <hr />

        <AnswerList data={this.state.data} />
      </div>
    );
  }
});

var AnswerList = React.createClass({
  render: function() {
    //console.log("AnswerList:render")
    var answerNodes = this.props.data.results.map(function(node,index) {
      var parity = 'odd'
      if(index % 2)
      {
        parity = 'even'
      }

      return (
        <Answer question={node.question} key={node.question.id}  id={node.question.id} answers={node.answers}  parity={parity} />
      );
    });
    return (
      <div className="answerList">
        {answerNodes}
      </div>
    );
  }
});

window.startAnswerEditor = function(url) {
  ReactDOM.render(
    <AnswerBox url={url} pollInterval={2000} />,
    document.getElementById('content')
  );

}

