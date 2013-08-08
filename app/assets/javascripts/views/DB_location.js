DD.Views.DBLocation = Backbone.View.extend({
  tagName: 'li',
  className: 'location',

  events: {
    "click button.add-comment": "addComment"
  },

  addComment: function () {
    var that = this;
    $('<li>Comment</li>').insertAfter(that.$el.find('button.add-comment').parent());
  },

  render: function () {
    var that = this;

    var renderedLocation = JST['locations/db_location']({
      location: that.model
    });

    that.$el.html(renderedLocation);

    return that;
  }
});