DD.Views.TagForm = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click input[type=submit]": "addTags",
    "click button.remove-tag-form": "hideForm",
    "keyup input[type=text]": "createNewOption"
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

    // Chosen Harvest plugin stuff
    this.$el.find("select[name=location\\[tag_ids\\]]").chosen({
      allow_single_deselect: true,
      no_results_text: "Hit ENTER to add the tag:",
      width: "70%"
    });

    return this;
  },

  hideForm: function () {
    $(this.el).undelegate('input[type=submit]', 'click');
    $(this.el).undelegate('button.remove-tag-form', 'click');
    this.$el.html("");
  },

  createNewOption: function (event) {
    var that = this;
    //Enable new subjects to be added to the options list
    var newOptionValue = $(event.target).val();
    var isNewOption = !($('option').filter(function (tagOption) {
      return $(tagOption).text() == newOptionValue;
    })).length;
    
    if (event.keyCode === 13 && isNewOption && (newOptionValue.length > 0)) {
      new DD.Models.Tag({name: newOptionValue}).save({}, {
        success: function (model, response) {
          var html = '<option value="' + response.id + '|' +
            response.name + '"' + ' selected="selected"' + '>' +
            response.name + '</option>';
            
          var options = that.$el.find("select[name=location\\[tag_ids\\]]");
          options.append(html);
          options.trigger("chosen:updated");
        }
      });
    }
  }
});