// in use
DD.Views.CollectionAsListItem = Backbone.View.extend({
  tagName: 'li',
  className: 'collection',

  events: {
    // "click button.add-comment": "addComment",
    "click button.show-on-map": "drawPolygon"
  },

  addComment: function () {
    // TODO
    console.log("Adding a comment for a listed location!");
    var that = this;
    var commentFormView = new DD.Views.CommentForm({
      model: that.model
    });
    that.$el.find('button.add-comment').parent().before(commentFormView.render().$el);
  },

  render: function () {
    var that = this;

    var renderedCollection = JST['collections/as_list_item']({
      collection: that.model
    });

    that.$el.html(renderedCollection);

    return that;
  },

  drawPolygon: function () {
    var that = this;
    markerManager.reset();
    markerManager.singlePolygon(that.model);
  }
});