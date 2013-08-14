DD.Views.UsersCollectionsList = Backbone.View.extend({
  tagName: 'ul',
  // collection: DD.Collections.Collections,

  initialize: function (collection, $headEl) {
    this.collection = collection;
    this.$headEl = $headEl;
  },

  render: function () {
    var that = this;

    if (!that.collection.length) {
      that.$el.append('<li class="location"><h3>No Collections Saved Yet...</h3></li>');
    } else {
      that.collection.each(function (collectionModel) {
        singleCollection = new DD.Views.DBCollection( {model: collectionModel} );
        that.$el.append(singleCollection.render().$el);

        console.log("rendering a view for a saved collection");
      });
    }
    // window.el = that.$el;
    // console.log(that.collection);
    if (this.$headEl) {this.insertTab(true);}
    return this;
  },

  cancel: function () {
    console.log("cancelling UsersCollectionsList View...");
    if (this.$headEl) {this.insertTab(false);}
    // no events to cancel yet
  },

  insertTab: function (boolean) {
    // Only necessary when the collection view
    // uses this View Instance
    var html = '<li><a id="users-collections-list"' +
      'href="#/users-collections-list/' + this.collection.get('id') +
      '"' + '>Friend Collections List</a></li>';

    if (boolean &! ($('#users-collections-list').length)) {
      this.$headEl.find('ul.tabs').append(html);
    } else if (!boolean) {
      console.log("Removing detail view tab");
      this.$headEl.find('#users-collections-list').parent().replaceWith("");
    }
  }
});