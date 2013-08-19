// in use
DD.Views.CollectionLocations = DD.Views.ListHelper.extend({
  // a view that accepts user model, and renders all locations
  tagName: 'ul',

  initialize: function (collectionModel, $headEl) {
    this.model = collectionModel;
    this.collection = collectionModel.get("locations");
    // only present when not viewing your own locations
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
    that.$el.prepend(that.parentCollectionInfo.bind(that)());
    return this;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    if (this.$headEl) {this.insertTab(false);}
    // no events to cancel yet
  },

  insertTab: function (boolean) {
    // always remove first
    this.$headEl.find('#collection-locations').parent().replaceWith("");
    
    // Only necessary when the collection view
    // uses this View Instance
    var html = '<li class="collection-locations"><a id="collection-locations"' +
      'href="#/collection-locations/' + this.model.get('id') +
      '">Collection Contents</a></li>';

    if (boolean &! ($('#collection-locations').length)) {
      this.$headEl.find('ul.tabs').append(html);
    }
  }

});