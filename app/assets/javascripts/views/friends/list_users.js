// in use
DD.Views.UserFriends = Backbone.View.extend({
  tagName: 'ul',
  // is a view that accepts user model, and renders all friends

  // collection: DD.Collections.Users,
  initialize: function (user, $headEl) {
    this.model = user;
    this.$headEl = $headEl;

    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.FriendsHead();
    this.$headEl.html(searchbarHead.render().$el);
  },

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
      html = '<li class="location"><h3>Viewing Your Friends</h3></li>';
    } else {
      html = '<li class="location"><h3>Viewing ' +
        that.model.get("email") + "'s Friends</h3></li>";
    }
    return html;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    // no events to cancel yet
  }

});