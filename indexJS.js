var balexi = {
	"Overlay": "balexiOverlay.jpg",
	"Offline Background": "balexiOffline.jpg",
	"Banner": "balexiBanner.jpg",
	"Panels": "balexiPanels.jpg"
}

var oreselia = {
	"Overlay": "oreseliaOverlay.jpg",
	"League Overlay": "oreseliaLeagueOverlay.jpg",
	"League Client": "oreseliaLeagueClient.jpg",
	"Offline Background": "oreseliaOffline.jpg",
	"Youtube Banner": "oreseliaYTBanner.jpg",
	"Cambox and Panels": "oreseliaCamboxPanels.jpg"
}

var deadfracture = {
	"Overlay": "deadfractureOverlay.jpg",
	"Offline Background": "deadfractureOffline.jpg",
	"Panels": "deadfracturePanels.jpg"
}

var jelloby = {
	"League Overlay": "jellobyLeagueOverlay.jpg",
	"League Client": "jellobyLeagueClient.jpg",
	"Overlay": "jellobyOverlay.jpg",
	"Offline Background": "jellobyOffline.jpg",
	"Osu Userpage Banner": "jellobyOsuUserpage.jpg",
	"Panels": "jellobyPanels.jpg"
}

var krulza = {
	"Dark Overlay": "krulzaOverlayDark.jpg",
	"Light Overlay": "krulzaOverlayLight.jpg"
}

var nobless = {
	"League Overlay": "noblessLeagueOverlay.jpg",
	"League Client": "noblessLeagueClient.jpg",
	"Offline Background": "noblessOffline.jpg",
	"Starting Soon": "noblessStarting.jpg",
	"Cambox and Panels": "noblessCamboxPanels.jpg"
}

var misc = {
	"Blue Zenith": "bluezenith.jpg",
	"Angelsim/firebat92": "firebat.jpg",
	"FadedDragon": "fadedDragon.jpg"
}

var amatzhu = {
	"Overlay": "amatzhuOverlay.jpg",
	"Offline Background": "amatzhuOffline.jpg",
	"Old Overlay": "amatzhuOverlay2.jpg",
	"Older Overlay": "amatzhuOverlay1.jpg",
	"Oldest Overlays": "amatzhuOverlay3.jpg",
	"Old Offline Background": "amatzhuOffline1.jpg",
	"Panels": "amatzhuPanels.jpg"
}

var clientList = {"Balexi": balexi, "Oreselia": oreselia, "DeadFracture": deadfracture, "Jelloby": jelloby, "Krulza": krulza, "noBless": nobless, "Miscellaneous": misc, "Amatzhukaze": amatzhu}

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
						$("<img src=images/previews/" + srcObj[key] + "></img>").css({"width": "100%", "margin-bottom": "125px"}),
					);
				}
			}
		}).fadeTo(600, 1);
		
	});

});