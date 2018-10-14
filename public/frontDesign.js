function showRecyclingReport(){
	var x = document.getElementById("reportRecyclingWindow");
	x.style.height = "25vh";
}

/*$(document).ready(function() {
	// all custom jQuery will go here
	$("#reportRecyclingWindow").click(function() {
		$("html, body").animate({ scrollTop: $(document).height() }, 400);
	})
});*/

$(document).ready(function() {
	// all custom jQuery will go here
	$("#reportRecyclingButton").click(function() {
		$('html, body').animate({
			scrollTop: $("#footer").offset().top - $("#header").height()}, 400);
	})
});