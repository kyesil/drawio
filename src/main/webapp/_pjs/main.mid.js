
//more shape images
mxClient.IS_CHROMEAPP = 1;
// Public global variables
window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE  || 10485760;
window.MAX_AREA = window.MAX_AREA || 15000 * 15000;
EditorUi.drawHost = 'https://predixi.lan/s/pdraw/src/main/webapp/';

// URLs for save and export
window.EXPORT_URL =  '_action.php?export';
window.SAVE_URL =  '_action.php?save';
window.OPEN_URL =  '_action.php?open';





window._App=null;
var Pinit = App.prototype.init;
App.prototype.init = function()
{
	_App=this;
	var r = Pinit.apply(this, arguments);

	return r;
	
}

