DD.Views.MyLocations = Backbone.View.extend({
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