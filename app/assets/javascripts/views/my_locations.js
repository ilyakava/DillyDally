DD.Views.MyLocations = Backbone.View.extend({
  tagName: 'ul',
  collection: DD.Collections.Locations,

  render: function () {
    var that = this;

    // that.$el.html('<ul id="data-list"></ul>');

    that.collection.each(function (location) {
      singleLocation = new DD.Views.DBLocation( {model: location} );
      that.$el.append(singleLocation.render().$el);

      console.log("rendering a view for a saved location");
    });
    // window.el = that.$el;
    // console.log(that.collection);
    return this;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    // no events to cancel yet
  },

});