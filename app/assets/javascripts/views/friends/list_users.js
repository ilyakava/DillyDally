DD.Views.UserFriends = Backbone.View.extend({
  tagName: 'ul',
  // collection: DD.Collections.Users,

  render: function () {
    var that = this;
    var friends = that.model.get("friends");
    if (!friends.length) {
      that.$el.append('<li class="location"><h3>No Users Followed Yet...</h3></li>');
    } else {
      friends.fetch({
        url: 'friends',
        success: function (collection, response) {
          new DD.Collections.Users(response).each(function (user) {
            singleUserView = new DD.Views.DBUser( {model: user} );
            that.$el.append(singleUserView.render().$el);
            console.log("rendering a view for a user");
          });
        }
      });
    }
    return this;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    // no events to cancel yet
  }

});