// in use
DD.Views.UserCollections = Backbone.View.extend({
  initialize: function ($headEl, $contentEl, userModel) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.user = userModel;

    // this.firstLoad = true;
    window.markerManager = new myMap.MarkerManager();

    // hook to render the list of collections
  },

  // listen for tab navigations and searches here
  events: {

  },

  render: function () {
    var renderedHead = JST['collections/head']();
    this.$headEl.html(renderedHead);
    return this;
  }

});