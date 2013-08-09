DD.Views.Detail = Backbone.View.extend({
  tagName: 'ul',
  className: 'location',

  initialize: function ($headEl, $contentEl, model) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.model = model;
  },

  events: {
    "click button.add-comment": "addComment"
  },

  addComment: function () {
    console.log("adding a comment in the detail view!");
    var that = this;
    var commentFormView = new DD.Views.CommentForm({
      model: that.model
    });
    that.$el.find('button.add-comment').parent().append(commentFormView.render().$el);
  },

  render: function () {
    var that = this;

    var showPage = JST['locations/show']({
      location: that.model
    });

    that.$el.html(showPage);
    that.$contentEl.html(that.$el);
    that.insertTab(true);
  },

  insertTab: function (boolean) {
    var html = '<li><a id="detail-view"' +
      'href="#/detail-view/' + this.model.get('id') +
      '"' + '>Location Details</a></li>';

    if (boolean) {
      this.$headEl.find('ul.tabs').append(html);
    } else {
      console.log("Removing detail view tab");
      this.$headEl.find('#detail-view').parent().replaceWith("");
    }
  },

  cancel: function () {
    this.insertTab(false);
    $(this.el).undelegate("button.add-comment", "click");

    // remove tab and clear events
  }


});