// A function to determine the marker size based on a property (e.g., severity)
function markerSize(severity) {
  return Math.sqrt(severity) * 50; // Adjust the multiplier as needed
}

let myMap = L.map("map", {
  center: [30.2672, -97.7431], // Austin, TX coordinates
  zoom: 10
});

let street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

// Initialize arrays to hold the markers for sunny and overcast accidents
// Create a new marker cluster group.
let sunnyMarkers = L.markerClusterGroup();
let overcastMarkers = L.markerClusterGroup();

// Fetch the CSV file and parse it
fetch("../../AustinTXAccidentsData2.csv")
  .then(response => response.text())
  .then(csvData => {
    let rows = csvData.split("\n");
    let headers = rows[0].split(",");

    for (let i = 1; i < rows.length; i++) {
      let row = rows[i].split(",");
      let accident = {};
      headers.forEach((header, index) => {
        accident[header.trim()] = row[index] ? row[index].trim() : undefined;
      });

      //   console.log(row);
      //   console.log(accident);

      let weather = accident["Weather_Condition"];
      let lat = parseFloat(accident["Start_Lat"]);
      let lng = parseFloat(accident["Start_Lng"]);
      let severity = parseInt(accident["Severity"]); // Assuming severity is a field in the CSV
      let startDate = accident["Start_Date"];

      //   console.log(weather);
      //   console.log(lat);
      //   console.log(lng);
      //   console.log(severity);
      //   console.log(startDate);

      if (
        !weather ||
        isNaN(lat) ||
        isNaN(lng) ||
        !startDate ||
        isNaN(severity)
      ) {
        continue;
      }

      // Only process data from the year 2022
      let year = new Date(startDate).getFullYear();
      if (year !== 2022) {
        continue;
      }

      let description = `Accident on ${startDate} under ${weather} conditions`;

      if (startDate.includes("2022")) {
        // console.log(
        //   `Processing accident: ${description}, Location: [${lat}, ${lng}]`
        // );
        if (weather.includes("Clear") || weather.includes("Fair")) {
          // Set the data location property to a variable.
          let location = [lat, lng];
          // Check for the location property.
          if (location) {
            // Add a new marker to the cluster group, and bind a popup.
            sunnyMarkers.addLayer(L.marker([lat, lng]).bindPopup(description));
          }
        } else if (weather.includes("Overcast") || weather.includes("Cloudy")) {
          // Set the data location property to a variable.
          let location = [lat, lng];
          // Check for the location property.
          if (location) {
            // Add a new marker to the cluster group, and bind a popup.
            overcastMarkers.addLayer(
              L.marker([lat, lng]).bindPopup(description)
            );
          }
        }
      }
    }

    // Add our marker cluster layer to the map.
    myMap.addLayer(sunnyMarkers);
    myMap.addLayer(overcastMarkers);

    console.log(
      `Sunny markers: ${sunnyMarkers.length}, Overcast markers: ${overcastMarkers.length}`
    );
  })
  .catch(error => console.error("Error loading or parsing CSV file:", error));
