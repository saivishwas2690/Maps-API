/**
 * Moves the map to display over Berlin
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */

function moveMapToBerlin(map) {
  map.setCenter({ lat: 17.2818, lng: 78.5378 });
  map.setZoom(14);
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable apikey with your own apikey

/***********************
  //
  //********* please set apiKey here *************/
window.apiKey = "fehqzuH0NAHbTuhr3voJhFiQJ3aOuSxliozD6UPe8TI";
//
/***********************/

var alertWarningUi = document.getElementById("alert-warning");

if (!apiKey) {
  alertWarningUi.style.display = "block";
} else {
  alertWarningUi.style.display = "none";
}

var platform = new H.service.Platform({
  apikey: window.apiKey,
});

var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(
  document.getElementById("map"),
  defaultLayers.vector.normal.map,
  {
    center: { lat: 50, lng: 5 },
    zoom: 4,
    pixelRatio: window.devicePixelRatio || 1,
  }
);
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener("resize", () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
window.onload = function () {
  moveMapToBerlin(map);
};

var encodedPolyline =
  "BGwynmkDu39wZvBtF3InfvHrdvHvbvHjc_EjS3I_dnG3X_O7zBzF_TzKvgB3DzKjDjIjDjIT3I3D3NrErOnGzU7GjX7G_YnGjXrT7iC_E7QzKvgBzKzjBjN3rB3DvM3DvMjD7LvCjI3IjcvMzoB7GvWjIzZzFjSvC7LnBvH7BrJ7B3I3DjN7LjmBvHjXrE_OjDnLnBnGzFxX"; // Example encoded polyline string

// Create the polyline from the encoded string (no decoding required)
var polyline = H.geo.LineString.fromFlexiblePolyline(encodedPolyline);

// Create a polyline object and add it to the map:
var routeLine = new H.map.Polyline(polyline, {
  style: { strokeColor: "blue", lineWidth: 5 },
});

map.addObject(routeLine);

// Adjust the map's viewport to ensure the route is visible
map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });


