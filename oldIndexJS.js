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

function openImage(evt, imageName) {
	var imageNameArray = ["Balexi", "DeadFracture", "Jelloby", "Krulza", "Oreselia"];
	var imageLinkArray = [
	"https://puu.sh/yXLQd/ab2f1a5ab3.png",
	"https://puu.sh/yXMfc/2c46293a60.png",
	"https://puu.sh/yXMie/c904247cb9.png",
	"https://puu.sh/yXMjR/2d6bf9325a.png",
	"https://puu.sh/yXYnT/b37bb5bd65.png"
	];

	document.getElementById("gallery-image").src = imageLinkArray[imageNameArray.indexOf(imageName)];
	document.getElementById("gallery-image").alt = imageName;
	//document.getElementById("gallery-image").style.border = "1px solid rbg(192,192,192);"

	//document.getElementByClassName("gallery-display").style.background-image = imageLinkArray[imageNameArray.indexOf(imageName)];

	var imageLinks = document.getElementsByClassName("gallery-item");
	for (var i=0; i<imageLinks.length; i++) {
		imageLinks[i].className = imageLinks[i].className.replace(" tabSelected", "");
	}

	evt.currentTarget.parentElement.className += " tabSelected";
}