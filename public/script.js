var materials = ["Paper/Cardboard", "Plastic", "Metals", "Glass", "Batteries/Bulbs", "Miscellaneous Electronics"]

function route(layerGroupObject){
	//find closest pointer in group
	//route to that pointer
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
