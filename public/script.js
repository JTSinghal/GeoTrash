


function addBin(){
    var code = 0;
    
    $('.whatCanBox').each(function(){
        if($(this).prop('checked') == true){
            code += parseInt($(this).val());
        }
    });
    console.log(code);
    //Test post request
    /*$.post("/add",  {
        lat: 12.3456,
        lon: 123.4567,
        code: 4,
        floor: -1
    });*/
}
