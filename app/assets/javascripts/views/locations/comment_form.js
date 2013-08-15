DD.Views.CommentForm = Backbone.View.extend({
  tagName: 'li',
  className: 'new-comment-form',

  events: {
    "click button.submit-comment": "newComment",
    "click button.remove-comment-form": "hideForm"
  },

  newComment: function () {
    var that = this;
    window.submit = that;
    console.log("is_private: " + !!that.$("input[name=comment\\[is_private\\]]").is(":checked"));

    var comment = new DD.Models.Comment({
      body: that.$("textarea[name=comment\\[body\\]]").val(),
      is_private: (!!that.$("input[name=comment\\[is_private\\]]").is(":checked")),
      location_id: that.model.get('id'),
    });

    comment.save({}, {
      success: function (model, response) {
        // console.log(response);
        var comment = new DD.Models.Comment(response).parseAuthor();
        that.model.get('comments').add(comment);
      }
    });
    that.hideForm();
  },

  render: function () {
    var form = JST['comments/form']();
    this.$el.html(form);
    return this;
  },

  hideForm: function () {
    $(this.el).undelegate('button.submit-comment', 'click');
    $(this.el).undelegate('button.remove-comment-form', 'click');
    this.$el.html("");
  }
});