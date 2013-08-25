// in use
DD.Views.LocationsHead = DD.Views.Head.extend({
  render: function () {
    var renderedHead = JST['locations/head']();
    this.$el.html(renderedHead);
    return this;
  }
});