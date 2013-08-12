DD.Views.Detail = Backbone.View.extend({
  tagName: 'ul',
  className: 'location',

  initialize: function ($headEl, $contentEl, model) {
    var that = this;
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.model = model;

    var renderCallback = that.render.bind(that);
    that.listenTo(that.model.get("user_visits"), "change add remove", renderCallback);
  },

  events: {
    "click button.add-comment": "addComment",
    "click button.add-tag": "addTag"
  },

  addTag: function () {
    console.log("openning addTag form!");
    var that = this;
    var tagFormView = new DD.Views.TagForm({
      model: that.model
    });
    that.$el.find('button.add-tag').parent().after(tagFormView.render().$el);
    // $(this.el).undelegate("button.add-tag", "click");
  },

  addComment: function () {
    console.log("adding a comment in the detail view!");
    var that = this;
    var commentFormView = new DD.Views.CommentForm({
      model: that.model
    });
    that.$el.find('button.add-comment').parent().append(commentFormView.render().$el);
  },

  userVisitHelper: function () {
    var that = this;

    var visitToggleView = new DD.Views.UserVisitToggle({
      model: that.model
    });

    that.$el.find('.toggle-user-visit').html(visitToggleView.render().$el);
  },

  render: function () {
    var that = this;
    console.log("RENDERING!");

    var showPage = JST['locations/show']({
      location: that.model
    });

    that.$contentEl.html(that.$el);
    that.$el.html(showPage);
    that.userVisitHelper();
    that.insertTab(true);
    that.delegateEvents();
  },

  insertTab: function (boolean) {
    var html = '<li><a id="detail-view"' +
      'href="#/detail-view/' + this.model.get('id') +
      '"' + '>Location Details</a></li>';

    if (boolean &! ($('#detail-view').length)) {
      this.$headEl.find('ul.tabs').append(html);
    } else if (!boolean) {
      console.log("Removing detail view tab");
      this.$headEl.find('#detail-view').parent().replaceWith("");
    }
  },

  cancel: function () {
    console.log("Cancelling events for detail location view");
    this.insertTab(false);
    $(this.el).undelegate("button.add-comment", "click");
    // remove tab and clear events
  }


});