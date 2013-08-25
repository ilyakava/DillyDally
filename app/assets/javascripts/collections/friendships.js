DD.Collections.Friendships = Backbone.Collection.extend({
  model: DD.Models.Friendship,

  parseAndSaveForm: function (serializedArray) {
    var that = this;
    _(serializedArray).each(function (object) {
      var friend_id = object["value"].split("|")[0];
      var email = object["value"].split("|")[1];

      that.create({
        friend_id: friend_id,
        user_id: current_user.id,
        friend: new DD.Models.User({email: email})
      });
    });
    return that;
  }
});