

QuestionModel = Backbone.Model.extend({
//  urlRoot: '/rest/questions/1/?format=json',
	urlRoot: '/rest/questions/',
    defaults: {
        id: 1,          // kts temp
        question_detail: 'Fetus',
        age: 0
    },
    initialize: function(){
         console.log("QuestionModel initialize");
        this.on("change:question_detail", function(model){
          var name = model.get("question_detail"); // 'Stewie Griffin'
          console.log("Changed my name to " + name );
        });
  }

	//url: function() {
	//	return this.urlRoot + '/' + this.id;
 	//}
});


var QuestionView = Backbone.View.extend({

    // el - stands for element. Every view has an element associated with HTML content, will be rendered.
    el: '#container',

    events: {
        'change .text': 'onChangeText',
        'change .detail': 'onChangeDetail',
        'click .save': 'onSave',
    },


    onChangeText: function(evt) {
        this.model.set('question_text', evt.currentTarget.value);
    },
    onChangeDetail: function(evt) {
        this.model.set('question_detail', evt.currentTarget.value);
    },

    onSave: function(evt) {
        this.model.save();
    },



    // It's the first function called when this view is instantiated.
    initialize: function(){
        console.log('QuestionView: initilize');

        //var source   = $("#question_edit_handlebar")[0].innerHTML
        //console.log("source = ",source)
        //this.question_edit_template = Handlebars.compile(source);

        //this.on('change', function(){
        //    console.log('- Values for this model have changed.');
        //});

        this.listenTo(this.model, 'sync change', this.render);
        this.model.fetch();
        // this is pointless, renders the defaults, because the above fetch is async
        //this.render();

    },
    // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.
    render: function(){
         console.log('QuestionView: render');


      console.log("model attributes = ",this.model.toJSON())

      //var result = this.question_edit_template(content)
      var result = Handlebars.templates.question_edit(this.model.toJSON())
         console.log("result = ",result)
         //this.$el.html("Hello TutorialsPoint!!!");
      this.$el.html(result);
      return this
    }
});




var QuestionCollection = Backbone.Collection.extend({
    model: QuestionModel,
    url: '/rest/questions/?format=json' ,
    initialize: function(){
        console.log("QuestionCollection initialize");
  }


});



var QuestionCollectionView = Backbone.View.extend({
  // el - stands for element. Every view has an element associated with HTML content, will be rendered.
  el: '#container',
  // It's the first function called when this view is instantiated.
  initialize: function(){
      console.log('QuestionCollectionView: initilize');

      //var source   = $("#question_edit_handlebar")[0].innerHTML
      //console.log("source = ",source)
      //this.question_edit_template = Handlebars.compile(source);

      this.on('change', function(){
          console.log('- Values for this model have changed.');
      });

    this.render();
  },
  // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.
  render: function(){
       console.log('QuestionCollectionView: render');


    var content = this.model.attributes
    console.log("model attributes = ",this.model.attributes)

    //var result = this.question_edit_template(content)
    var result = Handlebars.templates.question_edit(content)
       console.log("result = ",result)
       //this.$el.html("Hello TutorialsPoint!!!");
    this.$el.html(result);
  }
});

