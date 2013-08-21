DD.Views.NearbyResult = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click button.persist": "saveModel",
    "click a.click-to-center": "centerMap"
  },
  
  saveModel: function () {
    var that = this;
    console.log("saving a location model to DB");
    this.model.save();
    that.$el.find('button.persist').parent().html("You've Saved this Location");
  },

  render: function () {
    var that = this;

    var renderedLocation = JST['locations/nearby_search']({
      location: that.model,
      userSavedData: that.collection
    });

    that.$el.html(renderedLocation);

    return that;
  },

  centerMap: function () {
    var that = this;
    myMap.moveMap(that.model);
  }
});