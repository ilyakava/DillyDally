// in use
DD.Views.ListHelper = Backbone.View.extend({
  
  // assumes child view has a
  // this.collection = "a locations collection"
  renderMyLocations: function () {
    var that = this;
    that.collection.each(function (location) {
      singleLocation = new DD.Views.LocationAsListItem({
        model: location
      });
      that.$el.append(singleLocation.render().$el);

      console.log("rendering a view for a location in a list");
    });
  }
});