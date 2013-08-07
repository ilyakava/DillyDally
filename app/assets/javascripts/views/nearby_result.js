DD.Views.NearbyResult = Backbone.View.extend({
  tagName: 'li',
  className: 'location',

  render: function () {
    var that = this;
  
    var renderedLocation = JST['locations/nearby_search']({location: that.model});

    that.$el.html(renderedLocation);
    return that;
  }
});