// in use
DD.Views.UserCollectionsHead = DD.Views.Head.extend({
  render: function () {
    var renderedHead = JST['collections/head']();
    this.$el.html(renderedHead);
    return this;
  }
});