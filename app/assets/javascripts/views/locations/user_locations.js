// in use
DD.Views.UserLocations = DD.Views.LocationsList.extend({
  // a view that accepts user model, and renders all locations
  tagName: 'ul',
  collection: DD.Collections.Locations,

  initialize: function (userModel, $headEl) {
    this.model = userModel;
    this.collection = userModel.get("locations");
    this.$headEl = $headEl;
  },

  render: function () {
    var that = this;

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Locations Saved Yet...</h3></li>');
    } else {
      // method in parent view
      that.renderMyCollection.bind(that)();
    }
    // if (this.$headEl) {this.insertLocationListTab(true);}
    that.$el.prepend(that.parentInfo());
    return this;
  },

  parentInfo: function () {
    var that = this,
        html;
    var parentIsYourself = function () {
      return (that.model.get("email") == current_user.email);
    };
    if (parentIsYourself()) {
      html = '<li class="location"><h3>Viewing Your Locations</h3></li>';
    } else {
      html = '<li class="location"><h3>Viewing ' +
        that.model.get("email") + "'s Locations</h3></li>";
    }
    return html;
  },

  cancel: function () {
    console.log("cancelling MyLocations View...");
    if (this.$headEl) {this.insertLocationListTab(false);}
    // no events to cancel yet
  },

  insertLocationListTab: function (boolean) {
  //   // Only necessary when the collection view
  //   // uses this View Instance
  //   var html = '<li><a id="detail-view"' +
  //     'href="#/detail-view/' + this.collection.get('id') +
  //     '"' + '>Preview Collection</a></li>';

  //   if (boolean &! ($('#detail-view').length)) {
  //     this.$headEl.find('ul.tabs').append(html);
  //   } else if (!boolean) {
  //     console.log("Removing detail view tab");
  //     this.$headEl.find('#detail-view').parent().replaceWith("");
  //   }
  }

});