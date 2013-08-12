DD.Collections.LocationTags = Backbone.Collection.extend({
  model: DD.Models.LocationTag,
  url: '/location_tags',

  parseAndSaveForm: function (serializedArray, location_id) {
    var that = this;
    _(serializedArray).each(function (object) {
      that.create({
        location_id: location_id,
        tag_id: object["value"],
        user_id: current_user.id
      });
    });
    return that;
  }
});