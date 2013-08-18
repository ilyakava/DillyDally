// in use
DD.Views.UserCollections = Backbone.View.extend({
  tagName: 'ul',
  // is a view that accepts a user model, and renders collections

  initialize: function (userModel, $headEl) {
    this.model = userModel;
    this.collection = userModel.get("collections");
    this.$headEl = $headEl;
  },

  render: function () {
    var that = this;
    // var collections = that.model.get("collections");

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Collections Saved Yet...</h3></li>');
    } else {
      that.collection.each(function (collectionModel) {
        singleCollection = new DD.Views.CollectionAsListItem( {model: collectionModel} );
        that.$el.append(singleCollection.render().$el);

        console.log("rendering a view for a saved collection");
      });
    }
    return this;
  },

  cancel: function () {
    console.log("cancelling UserCollections View...");
    // no events to cancel yet
  },
});