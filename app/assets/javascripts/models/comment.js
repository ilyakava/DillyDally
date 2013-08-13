DD.Models.Comment = Backbone.Model.extend({
  url: '/comments',

  parseAuthor: function () {
    var that = this;

    that.set("author", new DD.Models.User(that.get("author")));
    return that;
  }
});