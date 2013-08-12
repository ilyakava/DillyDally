DD.Views.TagForm = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click button.submit-tag": "addTag"
  },

  addTag: function () {
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