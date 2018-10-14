var map = L.map('map').setView([40.4268, -86.9195], 18);
var curr = {
  lat: '',
  lng: ''
};

// Group of all pins
/*var pcbPins = L.layerGroup();
var plasPins = L.layerGroup();
var metalPins = L.layerGroup();
var glassPins = L.layerGroup();
var bbPins = L.layerGroup();
var miscPins = L.layerGroup();
*/
var overlays = {}
for(var i = 0; i < materials.length; i++){
    overlays[materials[i]] = L.layerGroup();
}
/*
var overlays = {
	"Paper": pcbPins,
  "Plastic": plasPins,
  "Metal": metalPins,
  "Glass": glassPins,
  "Batteries": bbPins,
  "Misc": miscPins
};*/

// Initial Map setup
function initMap() {
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamVyb3NpayIsImEiOiJjam42cjAzcnQwMjFkM3Jtc2N2M2V3NDZwIn0.pL85YX_yr3huGKt-Nz4jPg'
  }).addTo(map);
}

// Finds current location
function findLocation() {
  var getlatlng = function(position) {
    curr.lat = position.coords.latitude;
    curr.lng = position.coords.longitude;
    L.marker([curr.lat, curr.lng]).addTo(map).bindPopup("You are here!").openPopup();
  };
  navigator.geolocation.getCurrentPosition(getlatlng);
}

dropPin(40.4274, -86.9193, -1, 1);
dropPin(40.4272, -86.9195, -1, 1);
dropPin(40.4270, -86.9195, -1, 1);
dropPin(40.4268, -86.9195, -1, 1);
dropPin(40.4268, -86.9197, -1, 2);

// Drops recycle pins
function dropPin(lat, lng, floor, code) {
  console.log([lat, lng, floor, code]);
  var pinIcon = L.icon({
    iconUrl: 'Images/geoTrashLogo.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });
  var popupContent = "FILL THIS IN LATER";

  // L.marker([lat, lng], {icon: pinIcon}).addTo(map).bindPopup(popupContent);
  var pin = L.marker([lat, lng], {icon: pinIcon}).bindPopup(popupContent);
  sortPins(decode(code), pin);
}

// Sorts pins into different layer groups
function sortPins(info, pin) {
  for(var i = 0; i < info.length; i++){
       overlays[info[i]].addLayer(pin);
      // pin.addTo(overlays[info[i]]); 
  }
}

function getBins(callback){
    l = []
    $.get('/retrieve', function(d){
        for(var p in d){
            l.push(d[p]);
        }
        if(callback)callback(l);
    });
}

function main(){
    // Run on startup
    initMap();
    findLocation();
    getBins(function(bins){
        console.log(bins);
        for(var i = 0; i < bins.length; i++){
            dropPin(bins[i].lat, bins[i].lng, bins[i].floor, bins[i].code);
        }
    });
    console.log(overlays);
    L.control.layers(overlays).addTo(map);
}
main();
