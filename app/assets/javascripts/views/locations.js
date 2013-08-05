DD.Views.Locations = Backbone.View.extend({
  events: {
    "click button#recenter": "recenterMap"
  },

  render: function () {
    var that = this;
    var renderedContent = JST['locations/index']();
    

    that.$el.html(renderedContent);
    return that;
  },

  recenterMap: function () {
    console.log("in BB view!");

    var reCenterMap = function (lat, lng) {
      var latLng = new L.LatLng(lat, lng);
      // coordinates and zoom rating (higher # means more zoomed in)
      map.setView(latLng, 15);
    };

    var address = $(event.target).prev().val().toString();

    var geocoder = new MapQuest.Geocoder( API.MapQuest.key() );

    geocoder.query(address, reCenterMap);
  }
});