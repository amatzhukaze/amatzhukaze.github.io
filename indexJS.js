var balexi = {
	"Overlay": "images/previews/balexiOverlay.jpg",
	"Offline Background": "images/previews/balexiOffline.jpg",
	"Banner": "images/previews/balexiBanner.jpg",
	"Panels": "images/previews/balexiPanels.jpg"
}

var oreselia = {
	"Overlay": "images/previews/oreseliaOverlay.jpg",
	"League Overlay": "images/previews/oreseliaLeagueOverlay.jpg",
	"League Client": "images/previews/oreseliaLeagueClient.jpg",
	"Offline Background": "images/previews/oreseliaOffline.jpg",
	"Youtube Banner": "images/previews/oreseliaYTBanner.jpg",
	"Cambox and Panels": "images/previews/oreseliaCamboxPanels.jpg"
}

var deadfracture = {
	"Overlay": "images/previews/deadfractureOverlay.jpg",
	"Offline Background": "images/previews/deadfractureOffline.jpg",
	"Panels": "images/previews/deadfracturePanels.jpg"
}

var jelloby = {
	"League Overlay": "images/previews/jellobyLeagueOverlay.jpg",
	"League Client": "images/previews/jellobyLeagueClient.jpg",
	"Overlay": "images/previews/jellobyOverlay.jpg",
	"Offline Background": "images/previews/jellobyOffline.jpg",
	"Osu Userpage Banner": "images/previews/jellobyOsuUserpage.jpg",
	"Panels": "images/previews/jellobyPanels.jpg"
}

var krulza = {
	"Dark Overlay": "images/previews/krulzaOverlayDark.jpg",
	"Light Overlay": "images/previews/krulzaOverlayLight.jpg"
}

var amatzhu = {
	"Overlay": "images/previews/amatzhuOverlay.jpg",
	"Offline Background": "images/previews/amatzhuOffline.jpg",
	"Old Overlay": "images/previews/amatzhuOverlay2.jpg",
	"Older Overlay": "images/previews/amatzhuOverlay1.jpg",
	"Oldest Overlays": "images/previews/amatzhuOverlay3.jpg",
	"Old Offline Background": "images/previews/amatzhuOffline1.jpg",
	"Panels": "images/previews/amatzhuPanels.jpg"
}

var clientList = {"Balexi": balexi, "Oreselia": oreselia, "DeadFracture": deadfracture, "Jelloby": jelloby, "Krulza": krulza, "Amatzhukaze": amatzhu}

$(document).ready(function() {

	$(".tab").click(function() {
		$(".tab").removeClass("tabSelected");
		$(this).addClass("tabSelected");

		$(".tabDescription").css("display","none");
		$("#" + $(this).attr("tab-name")).css("display","block");
	});

	$(".gallery-item").click(function() {
		$(".gallery-item").removeClass("tabSelected");
		$(this).addClass("tabSelected");

		var src = $(this).attr("tab-name")
		var srcObj = clientList[$(this).attr("tab-name")];

		$("#gallery-display").fadeTo(600, 0, function() {
			$("#gallery-display .product-item").remove();
			$("#gallery-display .product-header").remove();
			$("#gallery-display img").remove();

			for (var key in srcObj) {
				if (srcObj.hasOwnProperty(key)) {
					$("#gallery-display").children().last().after(
						$("<h2></h2>").text(key).addClass("product-header").css({"text-align": "center", "margin-bottom": "20px", "background-image": "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(bg/" + src + "Title.png)", "background-position": "center"}),
						$("<img src=" + srcObj[key] + "></img>").css({"width": "100%", "margin-bottom": "125px"}),
					);
				}
			}
		}).fadeTo(600, 1);
		
	});

});