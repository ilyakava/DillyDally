DD.Views.Detail = Backbone.View.extend({
  tagName: 'ul',
  className: 'location',

  initialize: function ($headEl, $contentEl, model) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.model = model;
  },

  events: {
    "click button.add-comment": "addComment",
    "click button.have-not-visited": "deleteVisit",
    "click button.have-visited": "createVisit"
  },

  deleteVisit: function () {
    var that = this;
    var visit = (that.model.get("user_visits")).findWhere({"user_id": current_user.id});
    visit.destroy({url: 'user_visits/' + visit.get("id")});
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