


Backbone._sync = Backbone.sync;
Backbone.sync = function(method, model, options) {
    console.log("## overridden backbone _sync ##")
  if (!options.noCSRF) {
    var beforeSend = options.beforeSend;

    // Set X-CSRF-Token HTTP header
    options.beforeSend = function(xhr) {
        console.log("## overridden backbone _sync beforesend ##")
      var token = $('meta[name="csrf-token"]').attr('content');
        console.log("## overridden backbone _sync beforesend: token ##",token)
      if (token) { xhr.setRequestHeader('X-CSRFToken', token); }
      if (beforeSend) { return beforeSend.apply(this, arguments); }
    };
  }
  console.log("## overridden backbone _sync calling through ##")
  return Backbone._sync(method, model, options);
};


// http://stackoverflow.com/questions/18504235/understand-backbone-js-rest-calls
// https://addyosmani.com/backbone-fundamentals/
// https://www.sitepoint.com/backbone-basics-models-views-collections-templates/
//
//var HelloModel = require('./HelloModel');
//var HelloView = require('./HelloView');
//var $ = require('jquery');
//
//var model = new HelloModel({ id: document.location.search.slice(1) });
//model.fetch();

//$(document).ready(function() {
//    //var brandNewQuestion = new QuestionModel({ question_text: 'sample question', question_detail: 'sample question detail' });
//    //brandNewQuestion.save();
//
//
//    var human = new QuestionModel({ name: "Thomas", age: 67});
//    human.set({question_detail: 'Stewie Griffin'}); // This triggers a change and wil
//
//
//    var questions = new QuestionCollection()
//
//    questions.on('change', function(msg) {
//        console.log("questions loaded",questions)
//    }
//    )
//
//    questions.on('change:question_detail', function(msg) {
//        console.log("questions loaded",questions)
//    }
//    )
//
//
//    questions.fetch({
//        success: function (questionsResults) {
//            console.log("questions loaded")
;//            console.log(JSON.stringify(questions));
//            var appView = new QuestionCollectionView({model: questions});
//
//
//
//
//        }
//})
//    console.log("question fetch sent",questions)
//    var q2 = questions.get(2);
//    console.log("question 2",q2)











//	var question = new QuestionView({
//		el: $('.question').first(),
//		model: model
//	});
//});

