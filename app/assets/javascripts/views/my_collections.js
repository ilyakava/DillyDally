DD.Views.MyCollections = Backbone.View.extend({
  tagName: 'ul',
  // collection: DD.Collections.Locations,

  render: function () {
    var that = this;

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Collections Saved Yet...</h3></li>');
    } else {
      that.collection.each(function (collectionModel) {
        singleCollection = new DD.Views.DBCollection( {model: collectionModel} );
        that.$el.append(singleCollection.render().$el);

        console.log("rendering a view for a saved collection");
      });
    }
    // window.el = that.$el;
    // console.log(that.collection);
    return this;
  },

  cancel: function () {
    console.log("cancelling MyCollections View...");
    // no events to cancel yet
  },

});