DD.Views.RecenterResults = Backbone.View.extend({
  tagName: 'ul',

  initialize: function ($headEl, $contentEl) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
  },

  events: {
    "click p.location": "centerFromList"
    // "click button#recenter": "render"
  },

  centerFromList: function () {
    // only triggered when user clicks on address_list view
    var that = this;
    var clickId = parseInt($(event.target).attr('id'), 10);
    myMap.moveMap(that.searchResults.findWhere({'myId':clickId}));
    // Visually distinguish active location
    that.indentResult(clickId);
  },

  indentResult: function (myId) {
    $('p.location').each(function (location) {
      if (this.id == myId) {
        $(this).addClass("map-center");
      } else {
        $(this).removeClass("map-center");
      }
    });
  },

  checkTabs: function () {
    var that = this;
    // reaches outside of its own view
    if (!(that.$headEl.find('#didyoumean').length)) {
      that.$headEl.find('ul.tabs').append('<li><a id="didyoumean"'+
        'href="#/recenter-by-search">Did You Mean?</a></li>'
      );
    }
  },

  cancel: function () {
    console.log("cancelling RecenterResults View...");
    $(this.el).undelegate('p.location', 'click');
  },

  render: function () {
    var that = this;

    var displayResults = function (mqObjArray) {
      console.log("display results method starts");

      var recenterLocs = new DD.Collections.Locations();

      // parses array of mapquest objects into BB collection
      recenterLocs.parseMapQuest(mqObjArray);

      // render locations from BB collection
      var locListView = JST['locations/address_list']({
        locations: recenterLocs
      });

      if (!recenterLocs.length) {
        that.$el.html("<li><h3>Sorry, I couldn't find that location...</h3></li>");
      } else {
        that.$el.html(locListView);
      }
      that.$contentEl.html(that.$el);

      // save BB collection for future use in indenting, w/o persisting
      that.searchResults = recenterLocs;

      // sets map center to latLng of 1st result
      myMap.moveMap(recenterLocs.first());
      that.indentResult(1);

      console.log("display results method finished");
      // console.log(that.searchResults);
    };

    // grab searchbar element off the DOM
    var address = $('.recenter input[type=text]').val().toString();

    // method to instantiate my interface with mapquest
    var geocoder = new MapQuest.Geocoder( API.MapQuest.key() );

    // above callback arg recieves array of mapquest objs
    geocoder.query(address, displayResults);
    // ensures a "did you mean" **tab** is rendered
    that.checkTabs();
    return this;
  }
});