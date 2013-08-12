DD.Views.TagForm = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click input[type=submit]": "addTags",
  },

  addTags: function (event) {
    var that = this;
    event.preventDefault();

    console.log("SUBMITTIN");
    var formData = $(event.target).parent().serializeArray();
    var locationTagCollection = new DD.Collections.LocationTags();
    // pass in form with tag_ids, and also a location_id
    locationTagCollection.parseAndSaveForm(formData, that.model.get("id"));

  },

  render: function () {
    var tagChoices = new DD.Collections.Tags(
      JSON.parse($('#bootstrapped-tag-choices').html())
    );
    
    var form = JST['tags/form']({
      tagChoices: tagChoices
    });

    this.$el.html(form);
    this.$el.find("select[name=location\\[tag_ids\\]]").chosen({
      allow_single_deselect: true,
      no_results_text: "Press ENTER to add the tag:",
      width: "70%"
    });

    return this;
  }
});