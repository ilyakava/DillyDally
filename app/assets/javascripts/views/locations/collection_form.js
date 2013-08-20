DD.Views.CollectionForm = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click input[type=submit]": "saveTags",
    "click button.remove-collection-form": "hideForm",
    "keyup input[type=text].default": "createNewOption"
  },

  saveTags: function (event) {
    var that = this;
    event.preventDefault();

    var formData = $(event.target).parent().serializeArray();
    console.log(formData);
    var locationCollections = that.model.get("collection_locations");
    
    // pass in form with tag_ids and tag names, and also a location_id
    locationCollections.parseAndSaveForm(formData, that.model.get("id"));
    this.hideForm();
  },

  render: function () {
    var that = this;
    var collectionChoices = new DD.Collections.Collections(
      JSON.parse($('#bootstrapped-collection-choices').html())
    );
    var disabledChoices = that.model.get("collections");
    
    var form = JST['collections/form']({
      choices: collectionChoices,
      disabledChoices: disabledChoices
    });
    this.$el.html(form);

    // Chosen Harvest plugin stuff
    this.$el.find("select[name=location\\[collection_ids\\]]").chosen({
      allow_single_deselect: true,
      no_results_text: "Hit ENTER to create the collection:",
      width: "70%",
      search_contains: true,
      placeholder_text_multiple: "Add Some Collections..."
    });

    return this;
  },

  hideForm: function () {
    $(this.el).undelegate('input[type=submit]', 'click');
    $(this.el).undelegate('button.remove-collection-form', 'click');
    this.$el.html("");
  },

  createNewOption: function (event) {
    var that = this;
    //Enable new subjects to be added to the options list
    var newOptionValue = $(event.target).val();
    var isNewOption = !($('option').filter(function (existingOption) {
      return $(existingOption).text() == newOptionValue;
    })).length;
    
    if (event.keyCode === 13 && isNewOption && (newOptionValue.length > 0)) {
      new DD.Models.Collection({name: newOptionValue}).save({}, {
        success: function (model, response) {
          var html = '<option value="' + response.id + '|' +
            response.name + '"' + ' selected="selected"' + '>' +
            response.name + '</option>';

          that.model.get("collections").add(new DD.Models.Collection(response));
            
          var options = that.$el.find("select[name=location\\[collection_ids\\]]");
          options.append(html);
          options.trigger("chosen:updated");
        }
      });
    }
  }
});