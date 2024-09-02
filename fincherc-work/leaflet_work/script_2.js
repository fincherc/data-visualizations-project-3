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
let fogMarkers = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      html:
        '<div style="position: relative; width: 24px; height: 24px; text-align: center;">' +
        '<ion-icon name="reorder-three-outline" style="font-size: 24px;"></ion-icon>' +
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

let heatArray = []

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

      let description = `Accident on ${startDate} under ${weather} conditions`;

      // if (startDate.includes("2022")) {
      // console.log(
      //   `Processing accident: ${description}, Location: [${lat}, ${lng}]`
      // );

      // Location information was used in all if statements, it can be placed outside of it
      let location = [lat, lng];
      if (!location) continue;

      // Conditions are as follows:
      // 1. Cloudy/Clear/Overcast - this is usually where no weather conditions could hamper a person's driving ability

      if (
        // 2. Rain/Thunderstorms - this add another layer to a person's driving ability
        weather.includes("Rain") ||
        weather.includes("Drizzle") ||
        weather.includes("Thunder") ||
        weather.includes("T-Storm") ||
        weather.includes("Mist")
      ) {
        let tStormIcon = L.divIcon({
          html: '<ion-icon name="thunderstorm-outline" style="font-size: 24px;"></ion-icon>',
          className: "single-custom-icon",
          iconSize: [24, 24],
          iconAnchor: [15, 30]
        });

        badMarkers
          .addLayer(
            L.marker([lat, lng], { icon: tStormIcon }).bindPopup(description)
          )
          .addTo(myMap);
      } else if (
        // 3. Fog/Mist/Haze - visibility inhibits and makes it harder to drive
        weather.includes("Fog") ||
        weather.includes("Haze")
      ) {
        let fogIcon = L.divIcon({
          html: '<ion-icon name="reorder-three-outline" style="font-size: 24px;"></ion-icon>',
          className: "single-custom-icon",
          iconSize: [24, 24],
          iconAnchor: [15, 30]
        });

        fogMarkers
          .addLayer(
            L.marker([lat, lng], { icon: fogIcon }).bindPopup(description)
          )
          .addTo(myMap);
      } else if (
        // 4. Snow/Ice - Extremely difficult condition to drive in
        weather.includes("Snow") ||
        weather.includes("Freezing") ||
        weather.includes("Ice") ||
        weather.includes("Sleet")
      ) {
        let snowIcon = L.divIcon({
          html: '<ion-icon name="snow-outline" style="font-size: 24px;"></ion-icon>',
          className: "single-custom-icon",
          iconSize: [24, 24],
          iconAnchor: [15, 30]
        });

        freezingMarkers
          .addLayer(
            L.marker([lat, lng], { icon: snowIcon }).bindPopup(description)
          )
          .addTo(myMap);
      }
      // }
    }

    // Only display the bad weather markers
    myMap.addLayer(badMarkers);
    // These layers should start as hidden
    myMap.removeLayer(fogMarkers);
    myMap.removeLayer(freezingMarkers);

    // console.log(`Bad Weather markers: ${badMarkers.getLayers().length}`);
    // console.log(`Foggy Weather markers: ${clearCloudyMarkers.getLayers().length}`);
    // console.log(`Freezing Weather markers: ${freezingMarkers.getLayers().length}`);
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
    '<div><input type="checkbox" id="Freezing"><label for="Freezing">Freezing</label></div>';

  // Add event listeners to checkboxes
  div.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      // Toggle visibility of markers based on checkbox state
      let markerId = checkbox.id;
      if (markerId === "Foggy") {
        if (checkbox.checked) {
          myMap.addLayer(fogMarkers);
        } else {
          myMap.removeLayer(fogMarkers);
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
    );
  });

  return div;
};

// Add the legend to the map
legend.addTo(myMap);

//Setup Min/Max Clusters???
//Consider Color coding for the markers
//Add icon to single marker that is displayed
