DD.Views.DBLocation = Backbone.View.extend({
  tagName: 'li',
  className: 'location',

  render: function () {
    var that = this;

    var renderedLocation = JST['locations/db_location']({
      location: that.model
    });

    that.$el.html(renderedLocation);

    return that;
  }
});