DD.Views.LocationSearch = Backbone.View.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },

  events: {
    "click button#search-nearby": "searchNearby"
  },

  render: function () {
    var that = this;
    
    var renderedContent = JST['locations/search_header']();
    
    that.$el.html(renderedContent);
    $('.data-list').replaceWith(that.$el);
  },

  searchNearby: function () {
    var searchPhrase = $(event.target).prev().val();
    console.log(searchPhrase);
  }
});