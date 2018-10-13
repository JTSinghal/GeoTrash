var materials = ["Paper/Cardboard", "Plastic", "Metals", "Glass", "Batteries/Bulbs", "Miscellaneous Electronics"]

function route(){
	var recycleType = null;
	if ($('#findDropdown').val() === "paper"){
		recycleType = overlays[materials[0]];
	} else if ($('#findDropdown').val() === "plastic"){
		recycleType = overlays[materials[1]];
	} else if ($('#findDropdown').val() === "metals"){
		recycleType = overlays[materials[2]];
	} else if ($('#findDropdown').val() === "glass"){
		recycleType = overlays[materials[3]];
	} else if ($('#findDropdown').val() === "batteries"){
		recycleType = overlays[materials[4]];
	} else if ($('#findDropdown').val() === "electronics"){
		recycleType = overlays[materials[5]];
	}
	var distances = [];
	//var arrayOfMarkers = recycleType.getLayers();
	recycleType.eachLayer(function(l){			//debug by c
		//var dist = L.latLng(curr.lat, curr.lng).distanceTo(l.getLatLng())/1000;
		var dist = L.latLng([curr.lat, curr.lng]).distanceTo(l.getLatLng())/1000;
		console.log("Dist pushed: " + dist);
		distances.push(dist);
	});
	var indexOfShortest = 0		//debug: create dummy pins around campus that accept a certain recycling type. Change dropdown to that recycling type and click route and console log the different distance and the shortest distance and the pin coordinates of that pin.
	for (var i = 0; i < distances.length; i++){
		console.log("Shortest: " + distances[indexOfShortest]);
		console.log("Current : " + distances[i]);
		console.log("Index: " + indexOfShortest);
		if (distances[i] < distances[indexOfShortest]){
			indexOfShortest = i;	//access using getLayer(id)
			console.log("Switc: " + indexOfShortest);
		}
	}

	//console.log(L.latlng(Object.keys(recycleType._layers)[indexOfShortest]._latlng[0], Object.keys(recycleType._layers)[indexOfShortest]._latlng[1]))
	console.log(Object.keys(recycleType._layers)[indexOfShortest]);
	L.Routing.control({
		waypoints: [
			L.latLng([curr.lat, curr.lng]),
			//recycleType.getLayer(indexOfShortest + 26).getLatLng()	//getLayer(i) is returning something undefined, should return a layer. Adding 25 made it grab 29
			//L.latlng(Object.keys(recycleType._layers)[indexOfShortest]._latlng[0], Object.keys(recycleType._layers)[indexOfShortest]._latlng[1])
			recycleType.getLayer(Object.keys(recycleType._layers)[indexOfShortest]).getLatLng()
		],
		routeWhileDragging: true
	}).addTo(map)
}

function addBin(){

	var codeToSend = 0;
	var floorToSend = -1;
    
    $('.whatCanBox').each(function(){
        if($(this).prop('checked') == true){
            codeToSend += parseInt($(this).val());
        }
    });

    floorToSend = $('#floorDropdown').val();
    console.log(floorToSend);

	$.post("/add", {
		lat: curr.lat,
		lon: curr.lng,
		code: codeToSend,
		floor: floorToSend
	});
}

function decode(code){
    var i = 0;
    var canDo = []
    while(code > 0){
        var rem = code % 2;
        if(rem == 1)canDo.push(materials[i]);
        code = Math.floor(code/2)
        i++;
    }
    return canDo;

}
