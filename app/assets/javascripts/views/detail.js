DD.Views.Detail = Backbone.View.extend({
  initialize: function ($headEl, $contentEl, model) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.model = model;
  },

  render: function () {
    var that = this;

    var showPage = JST['locations/show']({
      model: that.model
    });

    that.$contentEl.html(showPage);
    that.insertTab(true);
  },

  insertTab: function (boolean) {
    if (boolean) {
      this.$headEl.find('ul.tabs').append('<li><a id="detail-view"' +
        'href="#/detail-view/' + this.model.get('id') + '>Location Details</a></li>'
      );
    } else {
      this.$headEl.find('#detail-view').parent().replaceWith("");
    }
  }, 

  close: function () {
    // remove tab and clear events
  }


});