DD.Collections.CollectionLocations = Backbone.Collection.extend({
  model: DD.Models.CollectionLocation,
  url: '/collection_locations',

  parseAndSaveForm: function (serializedArray, location_id) {
    var that = this;
    _(serializedArray).each(function (object) {
      var id = object["value"].split("|")[0];
      var name = object["value"].split("|")[1];

      that.create({
        location_id: location_id,
        collection_id: id,
        collection: new DD.Models.Collection({
          name: name,
          user_id: current_user.id
        }),
        user_id: current_user.id
      });
    });
    return that;
  }
});