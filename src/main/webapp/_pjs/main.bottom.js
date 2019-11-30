//remove title click event:
var fnameevents= _App.fname.mxListenerList;
_App.fname.removeEventListener(fnameevents[0].name,fnameevents[0].f);
_App.fname.removeEventListener(fnameevents[1].name,fnameevents[1].f);


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
	var name= this.currentFile.title;
	var xml = mxUtils.getXml(this.editor.getGraphXml());
	var svg = mxUtils.getXml(this.editor.graph.getSvg(null, 1, 0))

	
	new mxXmlRequest(SAVE_URL, 'filename=' + encodeURIComponent(name) +
						'&xml=' + encodeURIComponent(xml)+'&svg=' + encodeURIComponent(svg)).send();

  this.editor.setStatus(mxUtils.htmlEntities(name + ' - saved' + ' ' + new Date()));
/*
localStorage.setItem(name, xml);
					

	
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
