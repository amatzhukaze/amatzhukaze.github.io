$(document).ready(function(){

	$(".tab").click(function(){
		$(".tab").removeClass("tabSelected");
		$(this).addClass("tabSelected");

		$(".tabDescription").css("display","none");
		$("#" + $(this).attr("tab-name")).css("display","block");
	});

	$(".gallery-item").click(function(){
		var imageNameArray = ["Balexi", "DeadFracture", "Jelloby", "Krulza", "Oreselia"];
		var imageLinkArray = [
		"https://puu.sh/yXLQd/ab2f1a5ab3.png",
		"https://puu.sh/yXMfc/2c46293a60.png",
		"https://puu.sh/yXMie/c904247cb9.png",
		"https://puu.sh/yXMjR/2d6bf9325a.png",
		"https://puu.sh/yXYnT/b37bb5bd65.png"
		];

		$(".gallery-item").removeClass("tabSelected");
		$(this).addClass("tabSelected");

		$("#gallery-image").attr({
			"src": imageLinkArray[imageNameArray.indexOf($(this).attr("tab-name"))],
			"alt": $(this).attr("tab-name")
		});

	});

});