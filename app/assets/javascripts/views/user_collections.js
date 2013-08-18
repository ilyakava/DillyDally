// in use
DD.Views.UserCollections = DD.Views.ListHelper.extend({
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
      // method in parent view
      that.renderMyCollections.bind(that)();
    }
    that.$el.prepend(that.parentUserInfo.bind(that, 'Collections')());
    return this;
  },


  cancel: function () {
    console.log("cancelling UserCollections View...");
    // no events to cancel yet
  },
});