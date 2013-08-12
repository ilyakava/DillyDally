DD.Views.TagForm = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click button.submit-tag": "addTag"
  },

  addTag: function () {

  },

  render: function () {
    var form = JST['tags/form']();
    this.$el.html(form);
    return this;
  }
});