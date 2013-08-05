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
  // DD.initialize();
});

