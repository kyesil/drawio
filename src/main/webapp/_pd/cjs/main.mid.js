
//more shape images
mxClient.IS_CHROMEAPP = 1;
// Public global variables
window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE  || 10485760;
window.MAX_AREA = window.MAX_AREA || 15000 * 15000;
EditorUi.drawHost = 'https://predixi.lan/s/pdraw/src/main/webapp/';

// URLs for save and export
window.EXPORT_URL =  '_pd/php/action.php?export';
window.SAVE_URL =  '_pd/php/action.php?save';
window.OPEN_URL =  '_pd/php/action.php?open';

mxSettings.settings.pageFormat=new mxRectangle(0, 0, 1900, 1000);
mxSettings.settings.unit=mxConstants.POINTS;
mxSettings.settings.customLibraries.push("U_pd/cjs/predixi_water.xml");



// for get global app variable  app variable also include EditorUi element
window._App=null;
var Pinit = App.prototype.init;
App.prototype.init = function()
{
	_App=this;
	var r = Pinit.apply(this, arguments);

	return r;
	
}

// for pass app.js:4864 todo make it spacial
EditorUi.prototype.isOffline = function(ignoreStealth) 
{
	return false;
};


