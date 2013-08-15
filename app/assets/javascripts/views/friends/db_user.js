DD.Views.DBUser = Backbone.View.extend({
  tagName: 'li',

  render: function () {
    var that = this;

    var renderedUser = JST['friends/db_user']({
      user: that.model
    });

    that.$el.html(renderedUser);
    return that;
  }
});