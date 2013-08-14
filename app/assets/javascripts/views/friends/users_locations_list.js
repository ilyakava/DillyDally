DD.Views.UsersLocationsList = Backbone.View.extend({
  tagName: 'ul',
  collection: DD.Collections.Locations,

  initialize: function (collection, $headEl) {
    this.collection = collection;
    this.$headEl = $headEl;
  },

  render: function () {
    var that = this;

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Locations Saved Yet...</h3></li>');
    } else {
      that.collection.each(function (location) {
        singleLocation = new DD.Views.DBLocation( {model: location} );
        that.$el.append(singleLocation.render().$el);

        console.log("rendering a view for a saved location");
      });
    }
    // window.el = that.$el;
    // console.log(that.collection);
    if (this.$headEl) {this.insertTab(true);}
    return this;
  },

  cancel: function () {
    console.log("cancelling UsersLocationsList View...");
    if (this.$headEl) {this.insertTab(false);}
    // no events to cancel yet
  },

  insertTab: function (boolean) {
    // Only necessary when the collection view
    // uses this View Instance
    var html = '<li><a id="users-locations-list"' +
      'href="#/users-locations-list/' + this.collection.get('id') +
      '"' + '>Friend Locations List</a></li>';

    if (boolean &! ($('#users-locations-list').length)) {
      this.$headEl.find('ul.tabs').append(html);
    } else if (!boolean) {
      console.log("Removing detail view tab");
      this.$headEl.find('#users-locations-list').parent().replaceWith("");
    }
  }

});