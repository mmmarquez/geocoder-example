import geocoder from "geocoder-geojson";

// array of locations -- or CSV with addresses.
let locations = [
  { address: "1600 Amphitheatre Parkway, Mountain View, CA" },
  { address: "1600 Amphitheatre Parkway, Mountain View, CA" },
  { address: "1600 Amphitheatre Parkway, Mountain View, CA" },
  { address: "1600 Amphitheatre Parkway, Mountain View, CA" }
];
// we just want to add the results to the features array below, to keep the geoJson model.
let locationsModel = [{ features: [], type: "FeatureCollection" }];

// we loop through the locations and apply geocoder to each one, then we push each result as a new item in the features array.
locations.forEach((x, i) => {
  geocoder.google(x.address).then(geojson => {
    locationsModel[0].features.push(geojson.features);
  });
});

// locationsModel containes all the lat/long + geoJson data based on the adddres provided.
console.log(locationsModel);
