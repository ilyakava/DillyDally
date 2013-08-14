DD.Views.ListUsers = Backbone.View.extend({
  tagName: 'ul',
  collection: DD.Collections.Users,

  render: function () {
    var that = this;

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Users Followed Yet...</h3></li>');
    } else {
      that.collection.each(function (user) {
        singleUser = new DD.Views.DBUser( {model: user} );
        that.$el.append(singleUser.render().$el);

        console.log("rendering a view for a user");
      });
    }
    return this;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    // no events to cancel yet
  }

});