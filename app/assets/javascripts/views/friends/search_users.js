// in use
DD.Views.SearchUsers = Backbone.View.extend({
  className: "add-new-friends",
  
  events: {
    "click input[type=submit]": "saveFriends"
  },

  render: function () {
    var that = this;
    var usersChoices = new DD.Collections.Users(
      JSON.parse($('#bootstrapped-all-users').html())
    );

    var disabledChoices = new DD.Collections.Collections(
      (that.model.get("friendships")).map(
        function (friendship) {
          return friendship.get("friend");
        }
      )
    );

    var searchPage = JST['friends/search']({
      usersChoices: usersChoices,
      disabledChoices: disabledChoices
    });
    this.$el.html(searchPage);

    // Chosen Harvest plugin stuff
    this.$el.find("select[name=user\\[friend_ids\\]]").chosen({
      allow_single_deselect: true,
      no_results_text: "Could not find the user:",
      width: "70%",
      search_contains: true,
      placeholder_text_multiple: "Friend Some Users..."
    });

    return this;

  },

  saveFriends: function (event) {
    var that = this;
    event.preventDefault();

    var formData = $(event.target).parent().serializeArray();
    console.log(formData);
    that.model.get("friendships").parseAndSaveForm(
      formData
    );
    
    this.success();
  },

  success: function () {
    this.render();
    console.log("saved friends!");
    this.$el.find('h3').html('Successfuly friended users! Add More Friends!');
  },

  cancel: function () {

  }
});