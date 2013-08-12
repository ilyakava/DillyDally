DD.Collections.UserTags = Backbone.Collection.extend({
  model: DD.Models.UserTag,
  url: '/user_tags',

  parseForm: function (serializedArray, location_id) {
    var that = this;
    _(serializedArray).each(function (object) {
      that.add({
        location_id: location_id,
        tag_id: object["value"],
        user_id: current_user.id
      });
    });
    return that;
  }
});