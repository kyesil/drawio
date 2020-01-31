
//more shape images
mxClient.IS_CHROMEAPP = 1;
// Public global variables
window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE || 10485760;
window.MAX_AREA = window.MAX_AREA || 15000 * 15000;
EditorUi.drawHost = 'https://predixi.lan/s/pdraw/src/main/webapp/';

// URLs for save and export
window.EXPORT_URL = '_pd/php/action.php?export';
window.SAVE_URL = '_pd/php/action.php?save';
window.OPEN_URL = '_pd/php/action.php?open';

//mxSettings.settings.pageFormat = new mxRectangle(0, 0, 1900, 1000);//wecan set default file look _top.php
//mxSettings.settings.unit = mxConstants.POINTS; // does not matter

mxSettings.settings.customLibraries.push("U_pd/cjs/predixi_water.xml");

function fileloaded() {

};

// for get global app variable  app variable also include EditorUi element
window._App = null;
var PdescriptorChanged = App.prototype.descriptorChanged;
App.prototype.descriptorChanged = function () {
	_App = this;
	var r = PdescriptorChanged.apply(this, arguments);


	fileloaded();
	this.fname.innerHTML = _SC_PATH;
	//remove title click event:
	var fnameevents = this.fname.mxListenerList;
	this.fname.removeEventListener(fnameevents[0].name, fnameevents[0].f);
	this.fname.removeEventListener(fnameevents[1].name, fnameevents[1].f);

	var iconevents = this.appIcon.mxListenerList;
	console.log(iconevents); 
	this.appIcon.removeEventListener(iconevents[2].name, iconevents[2].f); //clear mouse hover/out şeysi
	this.appIcon.removeEventListener(iconevents[3].name, iconevents[3].f);


	this.appIcon.style.backgroundImage = "url('./_pd/css/img/back.svg')"; //mmanipulate this 
	this.appIcon.style.cursor="pointer";



	return r;
};

EditorUi.prototype.isOffline = function (ignoreStealth) {  // for pass app.js:4864 todo make it spacial
	return false;
};

App.prototype.appIconClicked = function (evt) {
	document.location.href="/panel/node/"+urlParams["nscreen"]+"/"+urlParams["npage"];
}

/*
//init app override we use descriptorChanged:file loaded
var Pinit = App.prototype.init;
App.prototype.init = function()
{
	_App=this;
	var r = Pinit.apply(this, arguments);
	apploaded();
	return r;

}*/




