DD.Models.Location = Backbone.Model.extend({
  url: '/locations',

  initialize: function (response) {
    this.attributes = this.parse(response);
  },

  parse: function (response, options) {
    response["categories"] = response["categories_as_array"];
    return response;
  }
});
