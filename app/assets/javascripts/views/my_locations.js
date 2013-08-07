DD.Views.MyLocations = Backbone.View.extend({
  collection: DD.Collections.Locations,

  render: function () {
    var that = this;

    that.$el.find('.data-list').html("");

    that.collection.each(function (location) {
      singleLocation = new DD.Views.NearbyResult( {model: location} );
      that.$el.find('.data-list').append(singleLocation.render().$el);
    });
    return this;
  }
});