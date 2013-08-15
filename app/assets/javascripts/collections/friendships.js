DD.Collections.Friendship = Backbone.Collection.extend({
  model: DD.Models.Friendship,

  parseAndSaveForm: function (serializedArray) {
    var that = this;
    _(serializedArray).each(function (object) {
      var friend_id = object["value"];

      that.create({
        friend_id: friend_id,
        user_id: current_user.id
      });
    });
    return that;
  }
});