// in use
DD.Views.UserCollections = Backbone.View.extend({
  tagName: 'ul',
  // is a view that accepts a user model, and renders collections

  render: function () {
    var that = this;
    var collections = that.model.get("collections");

    if (!collections.length) {
      that.$el.append('<li class="location"><h3>No Collections Saved Yet...</h3></li>');
    } else {
      collections.each(function (collectionModel) {
        singleCollection = new DD.Views.DBCollection( {model: collectionModel} );
        that.$el.append(singleCollection.render().$el);

        console.log("rendering a view for a saved collection");
      });
    }
    return this;
  },

  cancel: function () {
    console.log("cancelling MyCollections View...");
    // no events to cancel yet
  },
});