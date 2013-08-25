DD.Models.User = Backbone.Model.extend({
  url: 'current_users',

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
    response["friends"] = new DD.Collections.Users(
      response["friends"]
    );

    response["friendships"] = new DD.Collections.Friendships(response["friendships"]);
    (response["friendships"]).each(function (friendship) {
      friendship.set("friend", new DD.Models.User(friendship.get("friend")));
    });
    return response;
  }
});