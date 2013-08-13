DD.Views.FriendsHead = Backbone.View.extend({

  render: function () {
    var renderedHead = JST['friends/head']();
    this.$el.html(renderedHead);
    return this;
  }
});