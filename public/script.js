var materials = ["Paper/Cardboard", "Plastic", "Metals", "Glass", "Batteries/Bulbs", "Miscellaneous Electronics"]

function route(){
	var recycleType = null;
	if ($('#findDropdown').val() === "paper"){
		recycleType = pcbPins;
	} else if ($('#findDropdown').val() === "plastic"){
		recycleType = plasPins;
	} else if ($('#findDropdown').val() === "metals"){
		recycleType = metalPins;
	} else if ($('#findDropdown').val() === "glass"){
		recycleType = glassPins;
	} else if ($('#findDropdown').val() === "batteries"){
		recycleType = bbPins;
	} else if ($('#findDropdown').val() === "electronics"){
		recycleType = miscPins;
	}
	var distances = [];
	//var arrayOfMarkers = recycleType.getLayers();
	recycleType.eachLayer(function(l)){			//debug by c
		var dist = [curr.lat, curr.lng].distanceTo(l.getLatLng())/1000;
		distances.push(dist);
	}
	var indexOfShortest = 0		//debug: create dummy pins around campus that accept a certain recycling type. Change dropdown to that recycling type and click route and console log the different distance and the shortest distance and the pin coordinates of that pin.
	for (var i = 0; i < distances.length; i++){
		if (distances[i] < distances[indexOfShortest]){
			indexOfShortest = i;	//access using getLayer(id)
		}
	}

	L.Routing.control({
		waypoints: [
			[curr.lat, curr.lng],
			getLayer(i).getLatLng
		],
		routeWhileDragging: ture
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
