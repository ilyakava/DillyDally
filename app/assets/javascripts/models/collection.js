DD.Models.Collection = Backbone.Model.extend({

  initialize: function (response) {
    // prevent parsing of objs that are in right format
    // analogue of DD.Models.Location
    if ((response["locations"] instanceof Array)) {
      this.attributes = this.parse(response);
    }
  },

  parse: function (response, options) {
    console.log("PARSING collection");
    response["locations"] = new DD.Collections.Locations(
      response["locations"]
    );
    return response;
  }
});