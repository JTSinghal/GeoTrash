var map = L.map('map').setView([40.4268, -86.9195], 18);
var curr = {
  lat: '',
  lng: ''
};


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


function dropPin(lat, lng, floor, code) {
  var pinIcon = L.icon({
    iconUrl: 'Images/recycleLocation.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  var popupContent = "Floor: " + floor;

  L.marker([lat, lng], {icon: pinIcon}).addTo(map).bindPopup(popupContent);
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
}
main();









