// in use
DD.Views.NewCollection = Backbone.View.extend({
  tagName: 'ul',
  className: 'new-collection-form',

  events: {
    "click button.new-collection": "newCollection"
  },

  newCollection: function (event) {
    var that = this;
    new DD.Models.Collection({
      name: $(event.target).prev().val()
    }).save({}, {
      success: function (model, response) {
        that.model.get("collections").add(response);
        // Navigate to collection show page
        var targetUrl = '#/collection-locations/' + response["id"];

        Backbone.history.navigate("#/redirecting");
        Backbone.history.navigate(targetUrl);
      }
    });
  },

  render: function () {
    var that = this;

    var newCollectionForm = JST['collections/new']();

    this.$el.html(newCollectionForm);
    return that;
  },

  cancel: function () {
    // nothing yet
  }
});