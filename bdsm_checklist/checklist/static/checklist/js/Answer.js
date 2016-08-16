
AnswerModel = Backbone.Model.extend( {
    urlRoot: '/rest/answers/',
    defaults: {
        answer_text: '',
        answer_detail: '',
    },
    initialize: function() {
        console.log("AnswerModel initialize");

        this.on("change", function(model,options) {
            if (options && options.save === false) return;
                model.save();
            });
    },

    url: function() {
      if(this.id)
      {
          return this.urlRoot + this.id + '/';
      }
      return this.urlRoot;
    }
});


var AnswerDetailView = Backbone.View.extend( {

    // el - stands for element. Every view has an element associated with HTML content, will be rendered.
    el: '#container',

    events: {
        'change .text': 'onChangeText',
        'change .detail': 'onChangeDetail',
        'click .save': 'onSave',
        'click .remove': 'onRemove'
    },


    onChangeText: function(evt) {
        this.model.set('answer_text', evt.currentTarget.value);
    },
    onChangeDetail: function(evt) {
        this.model.set('answer_detail', evt.currentTarget.value);
    },

    onSave: function(evt) {
        this.model.save();
    },

    onRemove: function() {
        this.model.destroy();
    },


    // It's the first function called when this view is instantiated.
    initialize: function() {
        console.log('AnswerDetailView: initilize');

        //var source   = $("#answer_edit_handlebar")[0].innerHTML
        //console.log("source = ",source)
        //this.answer_edit_template = Handlebars.compile(source);

        //this.on('change', function(){
        //    console.log('- Values for this model have changed.');
        //});

        this.listenTo(this.model, 'sync change', this.render);
        this.model.fetch();
        // this is pointless, renders the defaults, because the above fetch is async
        //this.render();

    },
    // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.
    render: function() {
        console.log('AnswerDetailView: render')
        console.trace()
        console.log("model attributes = ", this.model.toJSON())

        //var result = this.answer_edit_template(content)
        var result = Handlebars.templates.answerdetail_edit(this.model.toJSON())
        //console.log("result = ", result)
        //this.$el.html("Hello TutorialsPoint!!!");
        this.$el.html(result);
        return this
    }
});


var AnswerCollection = Backbone.DjangoPageableCollection.extend( {
    model: AnswerModel,
    url: '/rest/answers/',
    initialize: function() {
        console.log("AnswerCollection initialize");
    },
});

var AnswerView = Backbone.View.extend( {

    tagName: 'div',

    events: {
        'change .text': 'onChangeText',
        'change .detail': 'onChangeDetail',
        'click .save': 'onSave',
        'click .remove': 'onRemove'
    },


    onChangeText: function(evt) {
        this.model.set('answer_text', evt.currentTarget.value);
        this.model.save();
    },
    onChangeDetail: function(evt) {
        this.model.set('answer_detail', evt.currentTarget.value);
        this.model.save();
    },

    onSave: function(evt) {
        this.model.save();
    },

    onRemove: function() {
        this.model.destroy();
    },


    // It's the first function called when this view is instantiated.
    initialize: function() {
        console.log('AnswerView: initilize');

        //var source   = $("#answer_edit_handlebar")[0].innerHTML
        //console.log("source = ",source)
        //this.answer_edit_template = Handlebars.compile(source);

        //this.on('change', function(){
        //    console.log('- Values for this model have changed.');
        //});

        this.listenTo(this.model, 'sync change', this.render);
        //this.model.fetch();
        // this is pointless, renders the defaults, because the above fetch is async
        //this.render();

    },
    // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.
    render: function() {
        console.log('AnswerView: render')
        //console.log("model attributes = ", this.model.toJSON())

        //var result = this.answer_edit_template(content)
        var result = Handlebars.templates.answer_edit(this.model.toJSON())
        //console.log("result = ", result)
        //this.$el.html("Hello TutorialsPoint!!!");
        this.$el.html(result);
        return this
    }
});


var AnswerListView = Backbone.View.extend( {
    // el - stands for element. Every view has an element associated with HTML content, will be rendered.
    el: '#container',
    // It's the first function called when this view is instantiated.
    initialize: function() {
        console.log('AnswerCollectionView: initilize');

        //var source   = $("#answer_edit_handlebar")[0].innerHTML
        //console.log("source = ",source)
        //this.answer_edit_template = Handlebars.compile(source);
        this.listenTo(this.collection, 'sync', this.render);

        this.on('change', function() {
                console.log('- Values for this model have changed.');
            });

        this.render();
    },
    // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.

    render: function() {
        console.log("AnswerListView:render:")

        var $list = this.$('div.answer-list').empty();

        this.collection.each(function(model) {
            console.log("AnswerListView:render: each")
                var item = new AnswerView({model:model})
                $list.append(item.render().$el);
            }, this);

        //this.$('ul.answer-list').html($list);
        return this;
    },


    oldrender: function() {
        console.log('AnswerCollectionView: render');


        var content = this.model.attributes
        console.log("model attributes = ", this.model.attributes)

        //var result = this.answer_edit_template(content)
        var result = Handlebars.templates.answer_edit(content)
        console.log("result = ", result)
        //this.$el.html("Hello TutorialsPoint!!!");
        this.$el.html(result);
    },

    events: {
        'click .create': 'onCreate',
    },

    onCreate: function() {
        console.log('AnswerCollectionView: onCreate');
        var $text = this.$('#answer_text');
        var $detail = this.$('#answer_detail');

        if ($text.val()) {
          this.collection.create({
              answer_text  : $text.val(),
              answer_detail: $detail.val()
          });

          $text  .val('');
          $detail.val('');
        }
    },

});

