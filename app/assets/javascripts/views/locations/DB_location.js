// in use
DD.Views.LocationAsListItem = Backbone.View.extend({
  tagName: 'li',
  className: 'location',

  initialize: function () {
    var that = this;
    var renderCallback = that.render.bind(that);
    that.listenTo(that.model.get("collection_locations"), "change add remove", renderCallback);
  },

  events: {
    "click button.add-comment": "addComment",
    "click button.set-map-center": "centerMap",
    "click button.add-collection": "openCollectionForm",
    "click button.delete-collection": "destroyCollectionLocs"
  },

  openCollectionForm: function () {
    console.log("openning addCollection form!");
    var that = this;
    var collectionFormView = new DD.Views.CollectionForm({
      model: that.model
    });
    // ensure only one tag form is rendered at a time
    if (!this.$el.find("select[name=location\\[collection_ids\\]]").length) {
      that.$el.find('button.add-collection').
        parent().after(collectionFormView.render().$el);
    }
  },

  addComment: function () {
    console.log("Adding a comment for a listed location!");
    var that = this;
    var commentFormView = new DD.Views.CommentForm({
      model: that.model
    });
    that.$el.find('button.add-comment').parent().before(commentFormView.render().$el);
  },

  render: function () {
    var that = this;

    var renderedLocation = JST['locations/db_location']({
      location: that.model
    });

    that.$el.html(renderedLocation);

    return that;
  },

  destroyCollectionLocs: function (event) {
    var collectionLocId = $(event.target).attr('data-id');
    this.model.get("collection_locations").get(collectionLocId).destroy();
  },

  centerMap: function () {
    var that = this;
    myMap.moveMap(that.model);
  }
});