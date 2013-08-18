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
    that.$el.prepend(that.parentInfo());
    return this;
  },

  parentInfo: function () {
    var that = this,
        html;
    var parentIsYourself = function () {
      return (that.model.get("email") == current_user.email);
    };
    if (parentIsYourself()) {
      html = '<li class="location"><h3>Viewing Your Collections</h3></li>';
    } else {
      html = '<li class="location"><h3>Viewing ' +
        that.model.get("email") + "'s Collections</h3></li>";
    }
    return html;
  },

  cancel: function () {
    console.log("cancelling UserCollections View...");
    // no events to cancel yet
  },
});