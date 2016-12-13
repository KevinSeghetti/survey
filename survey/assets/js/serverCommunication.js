//===============================================================================
// functions for interacting with the server

var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("serverCommunication")
var {choices_context} = require('./applicationData')

//===============================================================================

export function saveContextAnswer(answers) {
  var url = "/rest/answers/"       // for cases where we don't have an answer record yet
  var requestType = 'POST'
  if('url' in  answers)
  {
    url = answers.url
    requestType = 'PUT'
  }
  var postData = {}
  postData = answers

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
    success: (data) => {
      log.info("saveAnswer: success: returned data = ",JSON.stringify(data))
      // we have updated data from the server side, need to look up where to put it

      // kts todo
      //store.dispatch(loadSingleAnswerAction(data))

      log.info("== json loaded ==",data)
      //this.setState({data: data})

    },
    error: (xhr, status, err) => {
      //this.setState({data: answers})
      console.error(url, status, err.toString())
    }
  })
}

//-------------------------------------------------------------------------------

export function saveAnswers(question)
{
    chai.expect(question).to.exist
    log.trace("saveAnswers:",JSON.stringify(question,null,2))
    if('answers' in question) {
        let { answers } = question
        var contextNodes = choices_context.map((context) => {
          var contextName = context['name']
              log.trace("saveAnswers:context:",contextName)
          // look up answer, if present
          var contextanswers
          if(contextName in answers)
          {
            let contextAnswers = answers[contextName]
            saveContextAnswer(contextAnswers)
          }
        })
    }
}

//-------------------------------------------------------------------------------

