var materials = ["Paper/Cardboard", "Plastic", "Metals", "Glass", "Batteries/Bulbs", "Miscellaneous Electronics"]

function route(){
	
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

	/*$.post("/add", {
		lat: ,
		lon: ,
		code: codeToSend,
		floor: floorToSend
	});*/
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
