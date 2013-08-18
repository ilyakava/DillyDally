// in use
DD.Views.UserCollections = DD.Views.ListHelper.extend({
  tagName: 'ul',
  // is a view that accepts a user model, and renders collections

  initialize: function (userModel, $headEl) {
    this.model = userModel;
    this.collection = userModel.get("collections");
    // only present when not viewing your own collections
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
    if (this.$headEl) {this.insertTab(true);}
    that.$el.prepend(that.parentUserInfo.bind(that, 'Collections')());
    return this;
  },


  cancel: function () {
    console.log("cancelling UserCollections View...");
    if (this.$headEl) {this.insertTab(false);}
    // no events to cancel yet
  },

  insertTab: function (boolean) {
    // always remove first
    this.$headEl.find('#friends-collections').parent().replaceWith("");
    
    // Only necessary when the collection view
    // uses this View Instance
    var html = '<li class"friends-collections"><a id="friends-collections"' +
      'href="#/user-friends/' + this.model.get('id') +
      '/collections"' + ">Friend's Collections</a></li>";

    if (boolean &! ($('#friends-collections').length)) {
      this.$headEl.find('ul.tabs').append(html);
    }
  }
});