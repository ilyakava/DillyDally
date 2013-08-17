// in use
DD.Views.LocationAsListItem = Backbone.View.extend({
  tagName: 'li',
  className: 'location',

  events: {
    "click button.add-comment": "addComment",
    "click button.set-map-center": "centerMap"
  },

  addComment: function () {
    console.log("Adding a comment for a listed location!");
    var that = this;
    var commentFormView = new DD.Views.CommentForm({
      model: that.model
    });
    that.$el.find('button.add-comment').parent().before(commentFormView.render().$el);
  },

  render: function () {
    var that = this;

    var renderedLocation = JST['locations/db_location']({
      location: that.model
    });

    that.$el.html(renderedLocation);

    return that;
  },

  centerMap: function () {
    var that = this;
    myMap.moveMap(that.model);
  }
});