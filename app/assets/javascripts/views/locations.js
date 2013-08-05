DD.Views.Locations = Backbone.View.extend({
  render: function () {
    var that = this;
    var renderedContent = JST['locations/index']();

    that.$el.html(renderedContent);
    return that;
  }
});