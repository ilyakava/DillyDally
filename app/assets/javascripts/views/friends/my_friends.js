DD.Views.MyFriends = Backbone.View.extend({
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

        console.log("rendering a view for a saved user");
      });
    }
    // window.el = that.$el;
    // console.log(that.collection);
    return this;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    if (this.$headEl) {this.insertLocationListTab(false);}
    // no events to cancel yet
  },

  insertLocationListTab: function (boolean) {
    // Only necessary when the collection view
    // uses this View Instance
    var html = '<li><a id="detail-view"' +
      'href="#/detail-view/' + this.collection.get('id') +
      '"' + '>Preview Collection</a></li>';

    if (boolean &! ($('#detail-view').length)) {
      this.$headEl.find('ul.tabs').append(html);
    } else if (!boolean) {
      console.log("Removing detail view tab");
      this.$headEl.find('#detail-view').parent().replaceWith("");
    }
  }

});