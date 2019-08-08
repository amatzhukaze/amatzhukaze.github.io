var bgArray = [
"bg/1.jpg",
"bg/2.jpg",
"bg/3.jpg",
"bg/4.jpg"
];

var imgcounter = 0;

var bgRotate = function() {

	if(imgcounter==bgArray.length-1) {
		imgcounter = 0;
	}
	else {
		imgcounter++;
	}
}

$(document).ready(function() {
	setInterval(function() {

		$(".banner").fadeTo(1000, 0, function(){
			$(this).css({"background-image": "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 40%), url(" + bgArray[imgcounter] + ")"});
		}).fadeTo(1000, 1);
	
		$(".bottombanner").fadeTo(1000, 0, function(){
			$(this).css({"background-image": "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,1) 100%), url(" + bgArray[imgcounter] + ")"});
		}).fadeTo(1000, 1);
	
		bgRotate();
	}, 20000);
});