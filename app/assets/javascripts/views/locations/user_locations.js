// in use
DD.Views.UserLocations = DD.Views.ListHelper.extend({
  // a view that accepts user model, and renders all locations
  tagName: 'ul',
  // collection: DD.Collections.Locations,

  initialize: function (userModel, $headEl) {
    this.model = userModel;
    this.collection = userModel.get("locations");
    this.$headEl = $headEl;
  },

  render: function () {
    var that = this;

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Locations Saved Yet...</h3></li>');
    } else {
      // method in parent view
      that.renderMyLocations.bind(that)();
    }
    if (this.$headEl) {this.insertTab(true);}
    that.$el.prepend(that.parentUserInfo.bind(that, 'Locations')());
    return this;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    if (this.$headEl) {this.insertTab(false);}
    // no events to cancel yet
  },

  insertTab: function (boolean) {
    // always remove first
    this.$headEl.find('#friends-locations').parent().replaceWith("");
    
    // Only necessary when the collection view
    // uses this View Instance
    var html = '<li><a id="friends-locations"' +
      'href="#/user-friends/' + this.model.get('id') +
      '/locations"' + ">Friend's Locations</a></li>";

    if (boolean &! ($('#friends-locations').length)) {
      this.$headEl.find('ul.tabs').append(html);
    }
  }

});