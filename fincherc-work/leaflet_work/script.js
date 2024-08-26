// Initialize the map
var map = L.map("map").setView([30.2672, -97.7431], 10); // Centered on Austin, TX

// Add a tile layer (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18
}).addTo(map);

// GeoJSON data for sunny and overcast accidents in 2022
var sunnyAccidents = [
  // Add GeoJSON feature objects here for sunny conditions
  // Example:
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [-97.7431, 30.2672] },
    properties: { weather: "Sunny" }
  }
];

var overcastAccidents = [
  // Add GeoJSON feature objects here for overcast conditions
  // Example:
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [-97.7431, 30.2672] },
    properties: { weather: "Overcast" }
  }
];

// Function to style markers based on weather condition
function getColor(weather) {
  return weather === "Sunny"
    ? "orange"
    : weather === "Overcast"
    ? "gray"
    : "blue";
}

function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng, {
    radius: 8,
    fillColor: getColor(feature.properties.weather),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  });
}

// Adding sunny accidents to the map
L.geoJSON(sunnyAccidents, {
  pointToLayer: pointToLayer,
  onEachFeature: function (feature, layer) {
    layer.bindPopup("Weather: " + feature.properties.weather);
  }
}).addTo(map);

// Adding overcast accidents to the map
L.geoJSON(overcastAccidents, {
  pointToLayer: pointToLayer,
  onEachFeature: function (feature, layer) {
    layer.bindPopup("Weather: " + feature.properties.weather);
  }
}).addTo(map);
