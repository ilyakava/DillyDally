// in use
DD.Views.UserLocations = Backbone.View.extend({
  // a view that accepts user model, and renders all locations
  tagName: 'ul',
  collection: DD.Collections.Locations,

  initialize: function (user, $headEl) {
    this.collection = user.get("locations");
    this.$headEl = $headEl;
  },

  render: function () {
    var that = this;

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Locations Saved Yet...</h3></li>');
    } else {
      that.collection.each(function (location) {
        singleLocation = new DD.Views.LocationAsListItem({
          model: location
        });
        that.$el.append(singleLocation.render().$el);

        console.log("rendering a view for a saved location");
      });
    }
    // window.el = that.$el;
    // console.log(that.collection);
    if (this.$headEl) {this.insertLocationListTab(true);}
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