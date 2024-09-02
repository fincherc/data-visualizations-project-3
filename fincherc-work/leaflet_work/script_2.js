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

// let topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
//   attribution:
//     'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// }).addTo(myMap);

// Initialize arrays to hold the markers for sunny and overcast accidents
// Create a new marker cluster group.
let sunnyMarkers = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      html:
        '<div style="position: relative; width: 24px; height: 24px; text-align: center;">' +
        '<ion-icon name="sunny" style="font-size: 24px;"></ion-icon>' +
        '<span style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); font-size: 12px; color: black; font-weight: bold;">' +
        cluster.getChildCount() +
        "</span></div>",
      className: "custom-cluster-icon"
    });
  }
});

let overcastMarkers = L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      html:
        '<div style="position: relative; width: 24px; height: 24px; text-align: center;">' +
        '<ion-icon name="cloudy" style="font-size: 24px;"></ion-icon>' +
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

      // Only process data from the year 2022
      let year = new Date(startDate).getFullYear();
      if (year !== 2022) {
        continue;
      }

      let description = `Accident on ${startDate} under ${weather} conditions`;

      //     sunLayer = L.geoJson(Data, {
      //         pointToLayer: function (feature, latlng) {
      //         return L.marker(latlng, {icon: sunIcon})
      //         .bindPopup('<h5>'+feature.properties.weather.sunny+’</h5>'+feature.properties.base_name, {'className': ‘sun-popup'});
      //         }
      //     cloudLayer = L.geoJson(Data, {
      //         pointToLayer: function (feature, latlng) {
      //         return L.marker(latlng, {icon: cloudIcon})
      //         .bindPopup('<h5>'+feature.properties.weather.cloudy+’</h5>'+feature.properties.base_name, {'className': ‘cloud-popup'});
      //         }
      //     });

      if (startDate.includes("2022")) {
        // console.log(
        //   `Processing accident: ${description}, Location: [${lat}, ${lng}]`
        // );
        if (weather.includes("Overcast") || weather.includes("Cloudy")) {
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
    heatArray.push([lat, lng]);
    }

    // console.log(heatArray)
    
    let heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 25
    });
    
    // Add our marker cluster layer to the map.
    myMap.addLayer(sunnyMarkers);
    myMap.addLayer(overcastMarkers);
    myMap.addLayer(heat);

    console.log(
      `Sunny markers: ${sunnyMarkers.length}, Overcast markers: ${overcastMarkers.length}`
    );
  })
  .catch(error => console.error("Error loading or parsing CSV file:", error));

// Create a custom legend control
let legend = L.control({ position: "topright" });

legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "info legend");

  // Add legend title
  div.innerHTML += "<h4>Weather Conditions</h4>";

  // Add legend items with checkboxes
  div.innerHTML +=
    '<div><input type="checkbox" id="sunny" checked>Sunny</label></div>';
  div.innerHTML +=
    '<div><input type="checkbox" id="overcast" checked><label for="overcast">Overcast</label></div>';
  div.innerHTML +=
    '<div><input type="checkbox" id="heat" checked><label for="heat">Heat</label></div>';

  // Add event listeners to checkboxes
  div.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      // Toggle visibility of markers based on checkbox state
      let markerId = checkbox.id;
      if (markerId === "sunny") {
        if (checkbox.checked) {
          myMap.addLayer(sunnyMarkers);
        } else {
          myMap.removeLayer(sunnyMarkers);
        }
      } 
      
      else if (markerId === "overcast") {
        if (checkbox.checked) {
          myMap.addLayer(overcastMarkers);
        }
        else {
          myMap.removeLayer(overcastMarkers)
        }
      }
        
      else if (markerId === "heat") {
        if (checkbox.checked) {
          myMap.addLayer(heat);
        } else {
          myMap.removeLayer(heat)
        }
      }

        // else {
        //   myMap.removeLayer(overcastMarkers);
        // }
      }
    );
  });

  return div;
};

// Add the legend to the map
legend.addTo(myMap);

//Setup Min/Max Clusters
//Consider Color coding for the markers
