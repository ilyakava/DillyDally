DD.Models.Location = Backbone.Model.extend({
  url: '/locations',

  initialize: function (response) {
    // prevent parsing of objs that are in right format
    if (!response["categories"]) {
      this.attributes = this.parse(response);
    }
  },

  parse: function (response, options) {
    response["categories"] = response["categories_as_array"];

    response["creator"] = new DD.Models.User(response["creator"]);
    response["savers"] = new DD.Collections.Users(response["savers"]);

    response["comments"] = new DD.Collections.Comments(response["comments"]);
    (response["comments"]).each(function (comment) {
      comment.set("author", new DD.Models.User(comment.get("author")));
    });

    response["visitors"] = new DD.Collections.Users(response["visitors"]);
    response["user_visits"] = new DD.Collections.UserVisits(response["user_visits"]);
    
    return response;
  }
});
