// in use
DD.Views.LocationDetail = Backbone.View.extend({
  tagName: 'ul',
  className: 'location',

  initialize: function ($headEl, $contentEl, model) {
    var that = this;
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.model = model;

    var renderCallback = that.render.bind(that);
    var renderVisitCallback = that.userVisitHelper.bind(that);
    that.listenTo(that.model.get("user_visits"), "change add remove", renderVisitCallback);
    that.listenTo(that.model.get("location_tags"), "change add remove", renderCallback);
    that.listenTo(that.model.get("comments"), "change add remove", renderCallback);
  },

  events: {
    "click button.add-comment": "openCommentForm",
    "click button.add-tag": "openTagForm",
    "click button.delete-tag": "destroyLocationTag"
  },

  openTagForm: function () {
    console.log("openning addTag form!");
    var that = this;
    var tagFormView = new DD.Views.TagForm({
      model: that.model
    });
    // ensure only one tag form is rendered at a time
    if (!this.$el.find("select[name=location\\[tag_ids\\]]").length) {
      that.$el.find('button.add-tag').parent().after(tagFormView.render().$el);
    }
  },

  openCommentForm: function () {
    console.log("adding a comment in the detail view!");
    var that = this;
    var commentFormView = new DD.Views.CommentForm({
      model: that.model
    });
    that.$el.find('button.add-comment').parent().before(commentFormView.render().$el);
  },

  userVisitHelper: function () {
    // Inserts the toggle
    var that = this;

    var visitToggleView = new DD.Views.UserVisitToggle({
      model: that.model
    });

    that.$el.find('.toggle-user-visit').html(visitToggleView.render().$el);
  },

  render: function () {
    var that = this;

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
    this.$headEl.find('#location-details').parent().replaceWith("");

    var html = '<li class="location-details"><a id="location-details"' +
      'href="#/user-locations/location-details/' +
      this.model.get('id') + '">Location Details</a></li>';

    if (boolean &! ($('#location-details').length)) {
      this.$headEl.find('ul.tabs').append(html);
    }
  },

  destroyLocationTag: function (event) {
    var locationTagId = $(event.target).attr('data-id');
    this.model.get("location_tags").get(locationTagId).destroy();
  },

  cancel: function () {
    console.log("Cancelling events for detail location view");
    this.insertTab(false);
    $(this.el).undelegate("button.add-comment", "click");
  }
});