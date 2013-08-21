DD.Views.TagForm = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click input[type=submit]": "saveTags",
    "click button.remove-tag-form": "hideForm",
    "keyup input[type=text].default": "createNewOption"
  },

  saveTags: function (event) {
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
    var that = this;
    var disabledChoices = new DD.Collections.Tags(
      (that.model.get("location_tags")).map(
        function (locationTag) {
          return locationTag.get("tag");
        }
      )
    );
    var tagChoices = new DD.Collections.Tags(
      JSON.parse($('#bootstrapped-tag-choices').html())
    ).fetch({
      success: function (collection, response) {
        var form = JST['tags/form']({
          tagChoices: collection,
          disabledChoices: disabledChoices
        });
        that.$el.html(form);
        // Chosen Harvest plugin stuff
        that.$el.find("select[name=location\\[tag_ids\\]]").chosen({
          allow_single_deselect: true,
          no_results_text: "Hit ENTER to add the tag:",
          width: "70%",
          search_contains: true,
          placeholder_text_multiple: "Add Some Tags..."
        });
      }
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