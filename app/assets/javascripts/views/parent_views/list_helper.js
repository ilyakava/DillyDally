// in use
DD.Views.ListHelper = Backbone.View.extend({
  
  // assumes child view has a
  // this.collection = "a locations collection"
  renderMyLocations: function () {
    var that = this;
    that.collection.each(function (location) {
      singleLocation = new DD.Views.LocationAsListItem({
        model: location
      });
      that.$el.append(singleLocation.render().$el);

      console.log("rendering a view for a location in a list");
    });
  },

  renderMyCollections: function () {
    var that = this;
    that.collection.each(function (collectionModel) {
      singleCollection = new DD.Views.CollectionAsListItem({
        model: collectionModel
      });
      that.$el.append(singleCollection.render().$el);

      console.log("rendering a view for a saved collection");
    });
  },

  parentUserInfo: function (listType) {
    var that = this,
        html;
    var parentIsYourself = function () {
      return (that.model.get("email") == current_user.email);
    };
    if (parentIsYourself()) {
      html = '<li class="location"><h3>Viewing Your ' +
        listType +'</h3></li>';
    } else {
      html = '<li class="location"><h3>Viewing ' +
        that.model.get("email") + "'s " + listType + "</h3></li>";
    }
    return html;
  },

  parentCollectionInfo: function () {
    var that = this;
    return ('<li class="location"><h3>Viewing Locations in the ' +
      _.humanize(that.model.get("name")) + " Collection</h3></li>");
  }
});