DD.Views.TagForm = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click input[type=submit]": "addTags",
    "click button.remove-tag-form": "hideForm"
  },

  addTags: function (event) {
    var that = this;
    event.preventDefault();

    var formData = $(event.target).parent().serializeArray();
    console.log(formData);
    var locationTagCollection = that.model.get("location_tags");
    
    // pass in form with tag_ids and tag names, and also a location_id
    locationTagCollection.parseAndSaveForm(formData, that.model.get("id"));
    this.hideForm();
  },

  render: function () {
    var tagChoices = new DD.Collections.Tags(
      JSON.parse($('#bootstrapped-tag-choices').html())
    );
    
    var form = JST['tags/form']({
      tagChoices: tagChoices
    });
    this.$el.html(form);

    // Chosen plugin stuff
    this.$el.find("select[name=location\\[tag_ids\\]]").chosen({
      allow_single_deselect: true,
      no_results_text: "Press ENTER to add the tag:",
      width: "70%"
    });

    return this;
  },

  hideForm: function () {
    $(this.el).undelegate('input[type=submit]', 'click');
    $(this.el).undelegate('button.remove-tag-form', 'click');
    this.$el.html("");
  }
});