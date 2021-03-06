DD.Views.UserVisitToggle = Backbone.View.extend({
  events: {
    "click button.have-not-visited": "deleteVisit",
    "click button.have-visited": "createVisit"
  },

  deleteVisit: function () {
    console.log("deleted a user_visit model");
    var that = this;
    var visit = (that.model.get("user_visits")).findWhere({"user_id": current_user.id});
    visit.destroy({
      url: 'user_visits/' + visit.get("id"),
      success: function () {
      }
    });
  },

  createVisit: function () {
    console.log("created a user_visit model");
    var that = this;
    var visit = new DD.Models.UserVisit({
      user_id: current_user.id,
      location_id: that.model.get("id")
    });
    visit.save({}, {
      success: function (model, response) {
        that.model.get("user_visits").add(response);
      }
    });
  },

  render: function () {
    var that = this;

    var toggleView = JST['locations/user_visit_toggle']({
      location: that.model
    });

    that.$el.html(toggleView);
    return that;
  }

});