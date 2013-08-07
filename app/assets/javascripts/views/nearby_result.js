DD.Views.NearbyResult = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click button.persist": "saveModel"
  },
  
  saveModel: function () {
    var that = this;
    console.log("saving a location model to DB");
    this.model.save({
      "lat": that.model.get("latLng").lat,
      "lng": that.model.get("latLng").lng
    });
  },

  render: function () {
    var that = this;

    var renderedLocation = JST['locations/nearby_search']({location: that.model});

    that.$el.html(renderedLocation);

    return that;
  }
});