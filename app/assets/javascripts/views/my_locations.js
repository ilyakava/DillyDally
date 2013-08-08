DD.Views.MyLocations = Backbone.View.extend({
  tagName: 'ul',
  collection: DD.Collections.Locations,

  render: function () {
    var that = this;

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Locations Yet...</h3></li>');
    } else {
      that.collection.each(function (location) {
        singleLocation = new DD.Views.DBLocation( {model: location} );
        that.$el.append(singleLocation.render().$el);

        console.log("rendering a view for a saved location");
      });
    }
    // window.el = that.$el;
    // console.log(that.collection);
    return this;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    // no events to cancel yet
  },

});