var order = {
	complete: false,
	overlay: 0,
	camerabox: 0,
	offlinebg: 0,
	profilecover: 0,
	panel: 0,
	avatar: 0,
	specialrequest: 0,
	specialrequestdesc: "",

	calculate: function() {

		var discountList = [0,0,1,3,5,5,7,7];
		var costList = [5,3,5,5,1,1,0]
		var itemList = [this.overlay, this.camerabox, this.offlinebg, this.profilecover, this.panel, this.avatar, this.specialrequest];
		var cost = 0;
		var count = 0;

		for(var i=0; i<7; i++) {
			cost += costList[i]*itemList[i];

			if(itemList[i]>0) {
				count++;
			}
		}

		var discount = discountList[count];

		this.complete = (this.specialrequest > 0 && this.specialrequestdesc!="") || (count > 0 && this.specialrequest == 0);

		return [cost, discount, cost - discount, count, this.specialrequest>0];
	}

}

var info = {
	complete: false,
	name: "",
	contactType: "Email",
	contact: "",
	validcontact: false,
	about: "",
	paypalemail: "",
	validpaypal: false,
	otherinfo: "",

	validateContact: function() {
		var optionName = ["Email", "Discord", "Twitch", "Other"];

    	var regexList = [
    		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
    		/^\S[\s\S]*#\d{4}$/, 
    		/^[a-zA-Z0-9_]{4,25}$/,
    		/^[\s\S]*$/
    		];

    	var re = regexList[optionName.indexOf(this.contactType)];

    	this.validcontact = re.test(this.contact.toLowerCase());
	},

	validatePayPal: function() {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		this.validpaypal = re.test(this.paypalemail.toLowerCase());
	},

	check: function() {
		this.complete = (this.name != "") && this.validcontact && this.validpaypal && (this.about != "");
	}

}

var conversion = {
	"Overlays": "overlay",
	"Camera Boxes": "camerabox",
	"Offline Backgrounds": "offlinebg",
	"Profile Covers": "profilecover",
	"Panels": "panel",
	"Avatars": "avatar",
	"Special Requests": "specialrequest",
	"Special Request Description": "specialrequestdesc",
	"IGN": "name",
	"Contact Platform": "contactType",
	"Contact Information": "contact",
	"Customer Reference": "about",
	"PayPal Email": "paypalemail",
	"Other Information": "otherinfo"
}

function checkOrder() {

	if(order.complete && info.complete) {
		$("#ReviewTab").removeClass("disabled");
		$("#ReviewTab").addClass("enabled");
	}

	else {
		$("#ReviewTab").removeClass("enabled");
		$("#ReviewTab").addClass("disabled");
	}
}


$(document).ready(function(){


	$(window).keydown(function(event) {
    	if(event.keyCode == 13) {
    		event.preventDefault();
    		return false;
    	}
  	});



	$(".tab").click(function(){
		$(".tab").removeClass("tabSelected");
		$(this).addClass("tabSelected");

		$(".tabDescription").css("display","none");
		$("#" + $(this).attr("tab-name")).css("display","block");
	});





	$("#Items").find("*").change(function(){
		order[conversion[$(this).attr("name")]] = $(this).val();
		var calculation = order.calculate();

		$('#discount-value').get(0).childNodes[0].childNodes[0].nodeValue = "$" + calculation[1] + ".00 USD";

		if(calculation[4]) {
			$('#cost-value').get(0).childNodes[0].childNodes[0].nodeValue = "$TBD USD";
			$('#totalcost-value').get(0).childNodes[0].childNodes[0].nodeValue = "$TBD USD";
		}

		else {
			$('#cost-value').get(0).childNodes[0].childNodes[0].nodeValue = "$" + calculation[0] + ".00 USD";
			$('#totalcost-value').get(0).childNodes[0].childNodes[0].nodeValue = "$" + calculation[2] + ".00 USD";
		}

		checkOrder();
	});





	$("#Info").find("*").change(function(){
		var optionName = ["Email", "Discord", "Twitch", "Other"];
		var placeholderText = ["username@service.com...", "Username#XXXX...", "Username...", "Please include platform name..."];

		info[conversion[$(this).attr("name")]] = $(this).val();

		if($(this).attr("name") == "Contact Information" || $(this).attr("name")=="Contact Platform") {
			info.validateContact();
			$("[name='Contact Information']").attr("placeholder", placeholderText[optionName.indexOf(info.contactType)]);

			if(info.validcontact) {
				$("[name='Contact Information']").css("border", "1px solid green");
			}

			else if(info.contact == "") {
				$("[name='Contact Information']").css("border", "1px solid gray");
			}

			else {
				$("[name='Contact Information']").css("border", "1px solid red");
			}
		}

		if($(this).attr("name")=="PayPal Email") {
			info.validatePayPal();

			if(info.validpaypal) {
				$(this).css("border", "1px solid green");
			}

			else if(info.paypalemail == "") {
				$(this).css("border", "1px solid gray");
			}

			else {
				$(this).css("border", "1px solid red");
			}
		}

		info.check();

		checkOrder();
	});




	$("#ReviewTab").click(function(){
		var i;
		var itemNames = ["Overlays", "Camera Boxes", "Offline Backgrounds", "Profile Covers", "Panels", "Avatars"];
		var itemValues = [5,3,5,5,1,1];

		$(".product-item").remove();

		for (i=0; i<6; i++) {
			if(order[conversion[itemNames[i]]]>0) {
				$("#itemTable").children().last().after(
					$("<p></p>").text(itemNames[i]).addClass("product-item"),
					$("<p></p>").text(order[conversion[itemNames[i]]]).addClass("product-item"),
					$("<p></p>").text(order[conversion[itemNames[i]]] + " x $" + itemValues[i] + ".00USD = $" + order[conversion[itemNames[i]]]*itemValues[i] + ".00USD").addClass("product-item"),
				);
				
			}
		}

		var calculation = order.calculate();

		if(calculation[4]>0) {
			$("#itemTable").children().last().after(
				$("<p></p>").text("Special Request: " + order.specialrequestdesc).addClass("product-item"),
				$("<p></p>").text(order.specialrequest).addClass("product-item"),
				$("<p></p>").text("$TBD USD").addClass("product-item"),
			);
		}

		$("#itemTable").children().last().after(
			$("<p></p>").text("Cost:").addClass("product-item").css({"font-weight": "bold", "border-top": "1px solid black", "text-align": "right", "grid-column-start": "1", "grid-column-end": "3"}),
			$("<p></p>").text("$" + calculation[0] + ".00 USD").addClass("product-item").css({"font-weight": "bold", "border-top": "1px solid black"}),
			$("<p></p>").text("Discount:").addClass("product-item").css({"font-weight": "bold", "border-bottom": "1px solid black", "text-align": "right", "grid-column-start": "1", "grid-column-end": "3"}),
			$("<p></p>").text("$" + calculation[1] + ".00 USD").addClass("product-item").css({"font-weight": "bold", "border-bottom": "1px solid black"}),
			$("<p></p>").text("Total Cost:").addClass("product-item").css({"font-weight": "bold", "border-top": "1px solid black", "text-align": "right", "grid-column-start": "1", "grid-column-end": "3"}),
			$("<p></p>").text("$" + calculation[2] + ".00 USD").addClass("product-item").css({"font-weight": "bold", "border-top": "1px solid black"})
		);

		var idArray = ["IGN", "Reference", "PayPal", "Other"];
		var nameArray = ["IGN", "Customer Reference", "PayPal Email", "Other Information"];

		for(i=0; i<4; i++) {
			$("#" + idArray[i]).get(0).innerText = info[conversion[nameArray[i]]];
		}

		$("#Contact").get(0).innerText = info.contactType + ": " + info.contact;
	});

});