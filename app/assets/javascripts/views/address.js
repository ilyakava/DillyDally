// NOT IN USE


DD.Views.Address = Backbone.View.extend({
  tagName: 'li',
  className: 'address',

  events: {
    "click p": "recenterMap"
  },

  recenterMap: function () {
    var lng = this.model.get("lng");
    var lat = this.model.get("lat");
    // Leaflet method
    latLng = new L.LatLng(lat, lng);
    // coordinates and zoom rating (higher # means more zoomed in)
    map.setView(latLng, 15);
  },

  indentSelf: function () {

  },

  render: function () {
    var that = this;

    var renderedAddress = JST['locations/address']({
      location: that.model
    });

    that.$el.html(renderedAddress);
    return that;
  }
});