window.DD = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(callback) {

    console.log('Hello from Backbone!');
    // callback contains info of what router to call
    // router contains info of what kind of sidebar to generate
    callback();
  }
};

$(document).ready(function(){
  // attach an event on page load to have a global toggle for the user nav menu
  $('#mobile-menu-expansion').on('click', function () {
    $('nav > ul.user').toggle();
  });

  // attach an event on page load to have a global toggle for the map
  $('#mobile-toggle-map').on('click', function () {
    myMap.toggleDisplay();
  });
});

