// in use
DD.Views.UserCollectionsHead = Backbone.View.extend({

  events: {
    "click button#recenter": "didYouMean"
  },

  didYouMean: function () {
    console.log("triggered map recenter search method");
    Backbone.history.navigate("#/redirecting");
    Backbone.history.navigate("#/user-collections/recenter-by-search");
  },

  render: function () {
    var renderedHead = JST['collections/head']();
    this.$el.html(renderedHead);
    return this;
  },

  cancel: function () {
    // nothing yet
  }
});