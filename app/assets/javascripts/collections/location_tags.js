DD.Collections.LocationTags = Backbone.Collection.extend({
  model: DD.Models.LocationTag,
  url: '/location_tags',

  parseAndSaveForm: function (serializedArray, location_id) {
    var that = this;
    _(serializedArray).each(function (object) {
      var id = object["value"].split("|")[0];
      var name = object["value"].split("|")[1];

      that.create({
        location_id: location_id,
        tag_id: id,
        tag: new DD.Models.Tag({name: name}),
        user_id: current_user.id
      });
    });
    return that;
  }
});