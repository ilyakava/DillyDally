DD.Views.SearchUsers = Backbone.View.extend({

  events: {
    "click input[type=submit]": "saveFriends"
  },

  render: function () {
    var usersChoices = new DD.Collections.Users(
      JSON.parse($('#bootstrapped-users').html())
    );

    var searchPage = JST['friends/search']({
      usersChoices: usersChoices
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
    new DD.Collections.Friendship().parseAndSaveForm(
      formData
    );
    
    this.success();
  },

  success: function () {
    console.log("saved friends!");
    this.$el.find('h3').html('Successfuly friended users! Add More Friends!');
  },

  cancel: function () {

  }
});