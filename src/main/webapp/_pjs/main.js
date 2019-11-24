//C:\KAPPS\WWW\StaticWeb\www\pdraw\src\main\webapp\js\diagramly\Menus.js:1433
//more shape images
mxClient.IS_CHROMEAPP = 1;
// Public global variables
window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE  || 10485760;
window.MAX_AREA = window.MAX_AREA || 15000 * 15000;

// URLs for save and export
window.EXPORT_URL =  '_action.php?export';
window.SAVE_URL =  '_action.php?save';
window.OPEN_URL =  '_action.php?open';

var graphCreateSvgImageExport = Graph.prototype.createSvgImageExport;

Graph.prototype.createSvgImageExport = function () {
	var exp = graphCreateSvgImageExport.apply(this, arguments);

	// Overrides rendering to add metadata
	var expDrawCellState = exp.drawCellState;

	exp.drawCellState = function (state, canvas) {
		var svgDoc = canvas.root.ownerDocument;
		var g = (svgDoc.createElementNS != null) ?
			svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
		g.setAttribute('id', 'cell-' + state.cell.id);

		// Temporary replaces root for content rendering
		var prev = canvas.root;
		prev.appendChild(g);
		canvas.root = g;

		expDrawCellState.apply(this, arguments);

		// Adds metadata if group is not empty
		if (g.firstChild == null) {
			g.parentNode.removeChild(g);
		}
		else if (mxUtils.isNode(state.cell.value)) {
			//g.setAttribute('content', mxUtils.getXml(state.cell.value));

			for (var i = 0; i < state.cell.value.attributes.length; i++) {
				var attrib = state.cell.value.attributes[i];
				g.setAttribute('' + attrib.name, attrib.value);
			}
		}

		// Restores previous root
		canvas.root = prev;
	};

	return exp;
};



var PsaveFile = App.prototype.saveFile;
App.prototype.saveFile = function (forceDialog, success) {
	/*var graph = this.editor.graph;
	var svgRoot = graph.getSvg(null, null, null, null, null, true)
	mxUtils.getXml(svgRoot);*/

	var xml = mxUtils.getXml(this.editor.getGraphXml());
	var svg = mxUtils.getXml(this.editor.graph.getSvg(null, 1, 0))

	
	new mxXmlRequest(SAVE_URL, 'filename=' + encodeURIComponent(name) +
						'&xml=' + encodeURIComponent(xml)+'&svg=' + encodeURIComponent(svg)).send();
/*
localStorage.setItem(name, xml);
					

	this.editor.setStatus(mxUtils.htmlEntities(name + " - " + mxResources.get('saved')) + ' ' + new Date());
	var r = PsaveFile.apply(this, arguments);
	console.log(mxUtils.getXml(svgRoot));
	console.log(this.getFileData(false, true));
	this.editor.setModified(false);
	this.editor.setFilename(name);
	this.updateDocumentTitle();
	console.log(this);
	return r;
	*/
	
};

var Pappinit = App.prototype.init;
App.prototype.init = function () {


	var r = Pappinit.apply(this, arguments);
	alert(r);
	return r;
};


EditorUi.drawHost = 'https://predixi.lan/s/pdraw/src/main/webapp/';