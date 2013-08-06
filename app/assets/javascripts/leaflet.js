myMap = (function () {

  var getRadius = function () {
    var mapBounds = map.getBounds();
    var degreeRadius = Math.abs(mapBounds.getCenter().lat) -
      Math.abs(mapBounds.getNorthEast().lat);
    // convert to meters
    return parseInt(Math.abs(degreeRadius * 111000), 10);
  };

  return {
    getRadius: getRadius
  };

})();