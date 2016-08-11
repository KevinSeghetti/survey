Backbone.View.extend({
    initialize: function() {
        console.log("QuestionView: initialize")
    	this.template = _.template($('#question-template').html());
    	this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
    	this.$el.html(this.template(this.model.attributes));
    }
);
