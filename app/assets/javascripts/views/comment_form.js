DD.Views.CommentForm = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click button.submit-comment": "newComment",
    "click button.remove-comment-form": "hideForm"
  },

  newComment: function () {
    var that = this;
    window.submit = that;

    var comment = new DD.Models.Comment({
      body: that.$("textarea[name=comment\\[body\\]]").val(),
      location_id: that.model.get('id')
    });

    comment.save();
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