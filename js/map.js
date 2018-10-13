var map = L.map('map').setView([40.4268, -86.9195], 18);

// Run on startup
initMap();
findLocation();

// Initial Map setup
function initMap() {
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 22,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamVyb3NpayIsImEiOiJjam42cjAzcnQwMjFkM3Jtc2N2M2V3NDZwIn0.pL85YX_yr3huGKt-Nz4jPg'
  }).addTo(map);
}

// Find current location
function findLocation() {
  var lat, lng;
  var getlatlng = function(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    	L.marker([lat, lng]).addTo(map).bindPopup("You are here!").openPopup();
  };
  navigator.geolocation.getCurrentPosition(getlatlng);
}
