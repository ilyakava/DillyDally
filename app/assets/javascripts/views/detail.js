DD.Views.Detail = Backbone.View.extend({
  tagName: 'ul',
  className: 'location',

  initialize: function ($headEl, $contentEl, model) {
    var that = this;
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.model = model;

    // var renderCallback = that.cancel(that.render.bind(that));
    // that.listenTo(that.model.get("user_visits"), "change", renderCallback);
    // that.listenTo(that.model.get("user_visits"), "add", renderCallback);
    // that.listenTo(that.model.get("user_visits"), "remove", renderCallback);
  },

  events: {
    "click button.add-comment": "addComment",
    "click button.uservisits": "delegateUserVisit"
  },

  delegateUserVisit: function () {
    if ($(event.target).attr('class').match("have-not")) {
      this.deleteVisit();
    } else {
      this.createVisit();
    }
  },

  deleteVisit: function () {
    var that = this;
    var visit = (that.model.get("user_visits")).findWhere({"user_id": current_user.id});
    visit.destroy({
      url: 'user_visits/' + visit.get("id"),
      success: function () {
        console.log("deleted a user_visit model");
        that.render();
      }
    });
  },

  createVisit: function () {
    var that = this;
    var visit = new DD.Models.UserVisit({
      user_id: current_user.id,
      location_id: that.model.get("id")
    });
    visit.save({}, {
      success: function (model, response) {
        console.log(response);
        that.model.get("user_visits").add(response);
        that.render();
      }
    });
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
    console.log("RENDERING BABY!");

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

    if (boolean &! ($('#detail-view').length)) {
      this.$headEl.find('ul.tabs').append(html);
    } else if (!boolean) {
      console.log("Removing detail view tab");
      this.$headEl.find('#detail-view').parent().replaceWith("");
    }
  },

  cancel: function (callback) {
    console.log("Cancelling events for detail location view");
    this.insertTab(false);
    $(this.el).undelegate("button.add-comment", "click");
    $(this.el).undelegate("button.have-not-visited", "click");
    $(this.el).undelegate("button.have-visited", "click");
    callback();
    // remove tab and clear events
  }


});