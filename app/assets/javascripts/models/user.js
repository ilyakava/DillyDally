DD.Models.User = Backbone.Model.extend({
  url: 'friends',

  initialize: function (response) {
    // prevent parsing of objs that are in right format
    // analogue of DD.Models.Location
    if ((response && response["locations"] instanceof Array)) {
      this.attributes = this.parse(response);
    }
  },

  parse: function (response, options) {
    console.log("PARSING user");
    
    response["locations"] = new DD.Collections.Locations(
      response["locations"]
    );
    response["collections"] = new DD.Collections.Collections(
      response["collections"]
    );
    return response;
  }
});