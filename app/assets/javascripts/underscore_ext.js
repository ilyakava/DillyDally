_.mixin({
  humanize : function(string) {
    string = string.replace(/_/g, " ");
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }
});