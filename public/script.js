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