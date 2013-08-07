DD.Views.MyLocations = Backbone.View.extend({
  collection: DD.Collections.Locations,

  render: function () {
    var that = this;

    that.$el.find('.data-list').html("");

    that.collection.each(function (location) {
      singleLocation = new DD.Views.DBLocation( {model: location} );
      that.$el.append(singleLocation.render().$el);

      window.el = that.$el;
      console.log(that.$el);
    });
    return this;
  },

  cancel: function () {
    // will get called
  }

});