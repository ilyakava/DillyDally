DD.Views.NearbyResult = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click button.persist": "saveModel"
  },

  tellmestuff: function () {
    alert("you clicked!");
  },

  saveModel: function () {
    console.log("saving a location model to DB");
    this.model.save();
  },

  render: function () {
    var that = this;

    var renderedLocation = JST['locations/nearby_search']({location: that.model});

    that.$el.html(renderedLocation);
    console.log(that.$el.find("button.persist"));

    return that;
  }
});