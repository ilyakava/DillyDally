DD.Models.Location = Backbone.Model.extend({
  urlRoot: '/locations',

  initialize: function (response) {
    // prevent parsing of objs that are in right format
    if ((response && response["categories"] instanceof Array)) {
      this.attributes = this.parse(response);
    }
  },

  parse: function (response, options) {
    console.log("PARSING a location object");
    // response["categories"] = response["categories_as_array"];

    response["creator"] = new DD.Models.User(response["creator"]);
    response["savers"] = new DD.Collections.Users(response["savers"]);

    // Safe iteration, makes bad objects but does not crash
    response["comments"] = new DD.Collections.Comments(response["comments"]);
    (response["comments"]).each(function (comment) {
      comment.set("author", new DD.Models.User(comment.get("author")));
    });

    response["visitors"] = new DD.Collections.Users(response["visitors"]);
    response["user_visits"] = new DD.Collections.UserVisits(response["user_visits"]);

    response["location_tags"] = new DD.Collections.LocationTags(response["location_tags"]);
    (response["location_tags"]).each(function (location_tag) {
      location_tag.set("tag", new DD.Models.Tag(location_tag.get("tag")));
    });

    response["collection_locations"] = new DD.Collections.CollectionLocations(response["collection_locations"]);
    (response["collection_locations"]).each(function (collection_location) {
      collection_location.set("collection", new DD.Models.Collection(collection_location.get("collection")));
    });
    
    response["collections"] = new DD.Collections.Collections(response["collections"]);


    return response;
  }
});
