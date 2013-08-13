DD.Views.DBCollection = Backbone.View.extend({
  tagName: 'li',
  className: 'collection',

  events: {
    // "click button.add-comment": "addComment",
    // "click button.set-map-center": "centerMap"
  },

  addComment: function () {
    // TODO
    console.log("Adding a comment for a listed location!");
    var that = this;
    var commentFormView = new DD.Views.CommentForm({
      model: that.model
    });
    that.$el.find('button.add-comment').parent().append(commentFormView.render().$el);
  },

  render: function () {
    var that = this;

    var renderedCollection = JST['collections/db_collection']({
      collection: that.model
    });

    that.$el.html(renderedCollection);

    return that;
  },

  centerMap: function () {
    // TODO
    var that = this;
    myMap.moveMap(that.model);
  }
});