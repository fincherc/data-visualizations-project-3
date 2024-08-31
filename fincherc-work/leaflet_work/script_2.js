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

// Initialize arrays to hold the markers for sunny and overcast accidents
// Create a new marker cluster group.
let clearCloudyMarkers = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      html:
        '<div style="position: relative; width: 24px; height: 24px; text-align: center;">' +
        '<ion-icon name="cloudy-outline" style="font-size: 24px;"></ion-icon>' +
        '<span style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); font-size: 12px; color: black; font-weight: bold;">' +
        cluster.getChildCount() +
        "</span></div>",
      className: "custom-cluster-icon"
    });
  }
});

let badMarkers = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      html:
        '<div style="position: relative; width: 24px; height: 24px; text-align: center;">' +
        '<ion-icon name="thunderstorm-outline" style="font-size: 24px;"></ion-icon>' +
        '<span style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); font-size: 12px; color: black; font-weight: bold;">' +
        cluster.getChildCount() +
        "</span></div>",
      className: "custom-cluster-icon"
    });
  }
});

let freezingMarkers = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      html:
        '<div style="position: relative; width: 24px; height: 24px; text-align: center;">' +
        '<ion-icon name="snow-outline" style="font-size: 24px;"></ion-icon>' +
        '<span style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); font-size: 12px; color: black; font-weight: bold;">' +
        cluster.getChildCount() +
        "</span></div>",
      className: "custom-cluster-icon"
    });
  }
});

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
      let severity = parseInt(accident["Severity"]);
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

        // Conditions are as follows:
        // 1. Cloudy/Clear/Overcast - this is usually where no weather conditions could hamper a person's driving ability

        if (
          // 2. Rain/Thunderstorms - this add another layer to a person's driving ability
          weather.includes("Rain") ||
          weather.includes("Drizzle") ||
          weather.includes("Thunder") ||
          weather.includes("T-Storm") ||
          weather.includes("Mist") ||
          !weather.includes("Freezing")
        ) {
          // Set the data location property to a variable.
          let location = [lat, lng];
          // Check for the location property.
          if (location) {
            // Add a new marker to the cluster group, and bind a popup.
            badMarkers.addLayer(L.marker([lat, lng]).bindPopup(description));
          }
        } else if (
          // 3. Fog/Mist/Haze - visibility inhibits and makes it harder to drive
          weather.includes("Fog") ||
          weather.includes("Haze")
        ) {
          // Set the data location property to a variable.
          let location = [lat, lng];
          // Check for the location property.
          if (location) {
            // Add a new marker to the cluster group, and bind a popup.
            clearCloudyMarkers.addLayer(
              L.marker([lat, lng]).bindPopup(description)
            );
          }
        } else if (
          // 4. Snow/Ice - Extremely difficult condition to drive in
          weather.includes("Snow") ||
          weather.includes("Freezing") ||
          weather.includes("Ice") ||
          weather.includes("Sleet")
        ) {
          // Set the data location property to a variable.
          let location = [lat, lng];
          // Check for the location property.
          if (location) {
            // Add a new marker to the cluster group, and bind a popup.
            freezingMarkers.addLayer(
              L.marker([lat, lng]).bindPopup(description)
            );
          }
        }
      }
    }

    // Add our marker cluster layer to the map.
    myMap.addLayer(clearCloudyMarkers);
    myMap.addLayer(badMarkers);
    myMap.addLayer(freezingMarkers);

    console.log(`Inclement Weather markers: ${badMarkers.length}`);
  })
  .catch(error => console.error("Error loading or parsing CSV file:", error));

// Create a custom legend control
let legend = L.control({ position: "topright" });

legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "info legend");

  // Add legend title
  div.innerHTML += "<h4>Weather Conditions</h4>";

  // Add legend items with checkboxes
  div.innerHTML += '<div><input type="checkbox" id="Foggy">Foggy</label></div>';
  div.innerHTML +=
    '<div><input type="checkbox" id="Rain & T-Storm" checked><label for="Rain & T-Storm">Rain & T-Storm</label></div>';
  div.innerHTML +=
    '<div><input type="checkbox" id="Freezing" checked><label for="Freezing">Freezing</label></div>';

  // Add event listeners to checkboxes
  div.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      // Toggle visibility of markers based on checkbox state
      let markerId = checkbox.id;
      if (markerId === "Foggy") {
        if (checkbox.checked) {
          myMap.addLayer(clearCloudyMarkers);
        } else {
          myMap.removeLayer(clearCloudyMarkers);
        }
      } else if (markerId === "Rain & T-Storm") {
        if (checkbox.checked) {
          myMap.addLayer(badMarkers);
        } else {
          myMap.removeLayer(badMarkers);
        }
      } else if (markerId === "Freezing") {
        if (checkbox.checked) {
          myMap.addLayer(freezingMarkers);
        } else {
          myMap.removeLayer(freezingMarkers);
        }
      }
    });
  });

  return div;
};

// Add the legend to the map
legend.addTo(myMap);

//Setup Min/Max Clusters???
//Consider Color coding for the markers
