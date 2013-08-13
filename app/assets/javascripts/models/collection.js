DD.Models.Collection = Backbone.Model.extend({
  url: 'collections',

  initialize: function (response) {
    this.attributes = this.parse(response);
  },

  parse: function (response, options) {
    response["locations"] = new DD.Collections.Locations(
      response["locations"]
    );

    return response;
  }
});