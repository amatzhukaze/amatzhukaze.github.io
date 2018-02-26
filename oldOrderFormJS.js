
//OOPS TOTALLY FORGOT JS SUPPORTS OOP, IM SO STUPID LMFAO
//TOO LAZY TO LEARN JQUERY, TOO HARD TO READ

var itemTabComplete = false;
var infoTabComplete = false;
var validContact = false;
var validPayPal = false;




function openTab(evt, tabDescriptionName) {

	var i, tabsDescriptionArray, tabsArray;
	tabsDescriptionArray = document.getElementsByClassName("tabDescription");
	for (i=0; i<tabsDescriptionArray.length; i++) {
		tabsDescriptionArray[i].style.display = "none";
	}

	tabsArray = document.getElementsByClassName("tab");
	for (i=0; i<tabsArray.length; i++) {
		tabsArray[i].className = tabsArray[i].className.replace(" tabSelected", "");
	}

	document.getElementById(tabDescriptionName).style.display = "block";
	evt.currentTarget.firstElementChild.className += " tabSelected";

}




function calculate(evt) {

	var i;
	var cost = 0;
	var count = 0;
	var discount = 0;
	var totalcost = 0;
	var specialRequest = false;

	var quantityNames = ["Overlays", "Camera Boxes", "Offline Backgrounds", "Profile Covers", "Panels", "Avatars"];
	var quantityValues = [5,3,5,5,1,1];
	var discountList = [0,0,1,3,5,5,7,7];
	var quantityArray = [];

	for(i=0; i<quantityNames.length; i++) {
		quantityArray.push(document.getElementsByName(quantityNames[i])[0]);
	}

	if (document.getElementsByName('Special Requests')[0].value > 0) {
		count++;
		specialRequest = true;
	}

	for (i=0; i<quantityArray.length; i++) {
		if (quantityArray[i].value > 0) {
			count++;
			cost += quantityValues[quantityNames.indexOf(quantityArray[i].name)] * quantityArray[i].value;
		}
	}

	discount = discountList[count];
	totalcost = cost - discount;
	return [cost, discount, totalcost, count, specialRequest];
}





function checkOrderTab(evt) {

	var calculation = calculate(evt);

	if (calculation[4]) {
		document.getElementById('cost-value').childNodes[0].childNodes[0].nodeValue = "$TBD USD";
		document.getElementById('totalcost-value').childNodes[0].childNodes[0].nodeValue = "$TBD USD";
	}

	document.getElementById('discount-value').childNodes[0].childNodes[0].nodeValue = "$" + calculation[1] + ".00 USD";

	if (document.getElementsByName('Special Requests')[0].value == 0) {
		document.getElementById('cost-value').childNodes[0].childNodes[0].nodeValue = "$" + calculation[0] + ".00 USD";
		document.getElementById('totalcost-value').childNodes[0].childNodes[0].nodeValue = "$" + calculation[2] + ".00 USD";
	}


	if (calculation[3] > 0) {
		itemTabComplete = true;
	}

	else {
		itemTabComplete = false;
	}

	if (document.getElementsByName('Special Requests')[0].value > 0 && document.getElementsByName("Special Request Description")[0].value == "") {
		itemTabComplete = false;
	}

	checkReviewTab(evt);
}




function checkInfoTab(evt) {

	var i;
	var allFilled = true;
	var inputArray = [];
	var textareaArray = [];

	inputArray = document.getElementById("Info").getElementsByTagName("input");
	textarea = document.getElementsByName("Customer Reference")[0];

	for (i=0; i<inputArray.length; i++) {
		if (inputArray[i].value == "") {
			allFilled = false;
		}
	}



	if (textarea.value == "") {
		allFilled = false;
	}

	

	infoTabComplete = allFilled;

	checkReviewTab(evt);
}




function checkReviewTab(evnt) {

	if (itemTabComplete && infoTabComplete && validContact && validPayPal) {
		document.getElementById("ReviewTab").className = "enabled";
	}

	else {
		document.getElementById("ReviewTab").className = "disabled";
	}
}




function changeSelectPlaceholder(evt) {
	var optionName = ["Email", "Discord", "Twitch", "Other"];
	var placeholderText = ["username@service.com...", "Username#XXXX...", "Username...", "Please include platform name..."];

	document.getElementsByName("Contact Information")[0].placeholder = placeholderText[optionName.indexOf(document.getElementsByName("Contact Platform")[0].value)];
}




function validate(evt) {

	var optionName = ["Email", "Discord", "Twitch", "Other"];

    var regexList = [
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
    /^\S[\s\S]*#\d{4}$/, 
    /^[a-zA-Z0-9_]{4,25}$/,
    /^[\s\S]*$/];

    var re = regexList[optionName.indexOf(document.getElementsByName("Contact Platform")[0].value)];

    if (re.test(document.getElementsByName("Contact Information")[0].value.toLowerCase())) {
    	document.getElementsByName("Contact Information")[0].style.border = "1px solid green";
    	validContact = true;
    }

    else {
    	document.getElementsByName("Contact Information")[0].style.border = "1px solid red";
    	validContact = false;
    }
}




function validatePayPal(evt) {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(document.getElementsByName("PayPal Email")[0].value.toLowerCase())) {
    	document.getElementsByName("PayPal Email")[0].style.border = "1px solid green";
    	validPayPal = true;
    }

    else {
    	document.getElementsByName("PayPal Email")[0].style.border = "1px solid red";
    	validPayPal = false;
    }

}




function generateOrder(evt) {
	var i;
	var itemsToDelete = document.getElementById("itemTable").getElementsByClassName("product-item");

	while(itemsToDelete.length > 0) {
		itemsToDelete[0].parentNode.removeChild(itemsToDelete[0]);
	}

	var itemNames = ["Overlays", "Camera Boxes", "Offline Backgrounds", "Profile Covers", "Panels", "Avatars"];
	var itemValues = [5,3,5,5,1,1];
	var item;

	for(i=0; i<itemNames.length; i++) {
		item = document.getElementsByName(itemNames[i])[0]

		if(item.value >0) {
			var itemDiv = document.createElement("p");
			var quantityDiv = document.createElement("p");
			var priceDiv = document.createElement("p");

			itemDiv.className = "product-item";
			quantityDiv.className = "product-item";
			priceDiv.className = "product-item";

			itemDiv.innerText = itemNames[i];
			quantityDiv.innerText = item.value;

			price = item.value * itemValues[i];

			priceDiv.innerText = item.value + " x  $" + itemValues[i] + ".00 USD = $" + price + ".00 USD";

			document.getElementById("itemTable").appendChild(itemDiv);
			document.getElementById("itemTable").appendChild(quantityDiv);
			document.getElementById("itemTable").appendChild(priceDiv);
		}

	}

	if(document.getElementsByName("Special Requests")[0].value > 0) {
		var specialDiv = document.createElement("p");
		var sQuantityDiv = document.createElement("p");
		var sPriceDiv = document.createElement("p");

		specialDiv.className = "product-item";
		sQuantityDiv.className = "product-item";
		sPriceDiv.className = "product-item";

		specialDiv.innerText = "Special Request: " + document.getElementsByName("Special Request Description")[0].value;
		sQuantityDiv.innerText = document.getElementsByName("Special Requests")[0].value;
		sPriceDiv.innerText = "$TBD USD";

		document.getElementById("itemTable").appendChild(specialDiv);
		document.getElementById("itemTable").appendChild(sQuantityDiv);
		document.getElementById("itemTable").appendChild(sPriceDiv);
	}

	var calculation = calculate(evt);

	var costTitle = document.createElement("p");
	var costDiv = document.createElement("p");

	costTitle.className = "product-item";
	costTitle.style = "font-weight: bold; border-top: 1px solid black; text-align: right; grid-column-start: 1; grid-column-end: 3;";

	costDiv.className = "product-item";
	costDiv.style = "font-weight: bold; border-top: 1px solid black;";

	costTitle.innerText = "Cost:";
	costDiv.innerText = "$" + calculation[0] + ".00 USD";

	document.getElementById("itemTable").appendChild(costTitle);
	document.getElementById("itemTable").appendChild(costDiv);



	var discountTitle = document.createElement("p");
	var discountDiv = document.createElement("p");

	discountTitle.className = "product-item";
	discountTitle.style = "font-weight: bold; border-bottom: 1px solid black; text-align: right; grid-column-start: 1; grid-column-end: 3;"

	discountDiv.className = "product-item";
	discountDiv.style = "font-weight: bold; border-bottom: 1px solid black;";

	discountTitle.innerText = "Discount:";
	discountDiv.innerText = "$" + calculation[1] + ".00 USD";

	document.getElementById("itemTable").appendChild(discountTitle);
	document.getElementById("itemTable").appendChild(discountDiv);




	var totalcostTitle = document.createElement("p");
	var totalcostDiv = document.createElement("p");

	totalcostTitle.className = "product-item";
	totalcostTitle.style = "font-weight: bold; border-top: 1px solid black; text-align: right; grid-column-start: 1; grid-column-end: 3;";

	totalcostDiv.className = "product-item";
	totalcostDiv.style = "font-weight: bold; border-top: 1px solid black;";

	totalcostTitle.innerText = "Total Cost:"
	totalcostDiv.innerText = "$" + calculation[2] + ".00 USD";

	document.getElementById("itemTable").appendChild(totalcostTitle);
	document.getElementById("itemTable").appendChild(totalcostDiv);





	var idArray = ["IGN", "Reference", "PayPal", "Other"];
	var nameArray = ["IGN", "Customer Reference", "PayPal Email", "Other Information"];

	for(i=0; i<4; i++) {
		document.getElementById(idArray[i]).innerText = document.getElementsByName(nameArray[i])[0].value;
	}

	var contactPlatform = document.getElementsByName("Contact Platform")[0].value;
	var contactInfo = document.getElementsByName("Contact Information")[0].value;

	document.getElementById("Contact").innerText = contactPlatform + ": " + contactInfo;
}