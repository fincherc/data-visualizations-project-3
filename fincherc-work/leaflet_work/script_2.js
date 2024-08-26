// Initialize arrays to hold the markers for sunny and overcast accidents
let sunnyMarkers = [];
let overcastMarkers = [];

// Fetch the CSV file and parse it
fetch("../../AustinTXAccidentsData.csv")
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

      console.log(row);
      console.log(accident);

      let weather = accident["Weather_Condition"];
      let lat = accident["Start_Lat"];
      let lng = accident["Start_Lng"];
      let startTime = accident["Start_Time"];

      console.log(weather);
      console.log(lat);
      console.log(lng);
      console.log(startTime);

      //   if (!weather || isNaN(lat) || isNaN(lng) || !startTime) {
      //     continue;
      //   }

      let description = `Accident on ${startTime} under ${weather} conditions`;
      console.log(description);

      if (startTime.includes("2022")) {
        console.log(
          `Processing accident: ${description}, Location: [${lat}, ${lng}]`
        );
        if (weather.includes("Clear") || weather.includes("Fair")) {
          sunnyMarkers.push(
            L.circle([lat, lng], {
              stroke: false,
              fillOpacity: 0.75,
              color: "orange",
              fillColor: "orange",
              radius: 100 // Fixed radius size
            }).bindPopup(description)
          );
        } else if (weather.includes("Overcast") || weather.includes("Cloudy")) {
          overcastMarkers.push(
            L.circle([lat, lng], {
              stroke: false,
              fillOpacity: 0.75,
              color: "gray",
              fillColor: "gray",
              radius: 100 // Fixed radius size
            }).bindPopup(description)
          );
        }
      }
    }

    console.log(
      `Sunny markers: ${sunnyMarkers.length}, Overcast markers: ${overcastMarkers.length}`
    );

    let street = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    );

    let topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    let sunnyLayer = L.layerGroup(sunnyMarkers);
    let overcastLayer = L.layerGroup(overcastMarkers);

    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };

    let overlayMaps = {
      "Sunny Accidents": sunnyLayer,
      "Overcast Accidents": overcastLayer
    };

    let myMap = L.map("map", {
      center: [30.2672, -97.7431], // Austin, TX coordinates
      zoom: 10,
      layers: [street, sunnyLayer, overcastLayer]
    });

    L.control
      .layers(baseMaps, overlayMaps, {
        collapsed: false
      })
      .addTo(myMap);
  })
  .catch(error => console.error("Error loading or parsing CSV file:", error));
