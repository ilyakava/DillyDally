DD.Views.NewCollection = Backbone.View.extend({
  tagName: 'ul',

  initialize: function (userSavedData) {
    this.userSavedData = userSavedData;
  },

  events: {
    "click button.new-collection": "newCollection"
  },

  newCollection: function (event) {
    var that = this;
    new DD.Models.Collection({
      name: $(event.target).prev().val()
    }).save({}, {
      success: function (model, response) {
        that.userSavedData.add(response);
        // Link to Navigate to collection show page
        var targetUrl = 'collections/' + response["id"];
        var html = '<li><a href="' + targetUrl + '">Click here to' +
          ' add locations to your new Collection</a></li>';
        $(event.target).parent().append(html);
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