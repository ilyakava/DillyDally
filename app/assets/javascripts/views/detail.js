DD.Views.Detail = Backbone.View.extend({

  initialize: function ($headEl, $contentEl, model) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.model = model;
  },

  render: function () {
    var that = this;

    var showPage = JST['locations/show']({
      location: that.model
    });

    that.$contentEl.html(showPage);
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
    // remove tab and clear events
  }


});