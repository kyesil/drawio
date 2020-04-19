

var graphCreateSvgImageExport = Graph.prototype.createSvgImageExport;

Graph.prototype.createSvgImageExport = function () {
	var exp = graphCreateSvgImageExport.apply(this, arguments);

	// Overrides rendering to add metadata
	var expDrawCellState = exp.drawCellState;

	exp.drawCellState = function (state, canvas) {
		var svgDoc = canvas.root.ownerDocument;
		var g = (svgDoc.createElementNS != null) ?
			svgDoc.createElementNS(mxConstants.NS_SVG, 'g') : svgDoc.createElement('g');
		//g.setAttribute('id', 'cell-' + state.cell.id);

		// Temporary replaces root for content rendering
		var prev = canvas.root;
		prev.appendChild(g);
		canvas.root = g;
		expDrawCellState.apply(this, arguments);

		// Adds metadata if group is not empty
		///state çizim ekranından gelen veri 

		if (g.firstChild == null) {
			g.parentNode.removeChild(g);
		}
		else if (mxUtils.isNode(state.cell.value)) {
			//g.setAttribute('content', mxUtils.getXml(state.cell.value));
			if (state.style.image) {
				let ss = state.style.image.split('data:image/svg+xml;base64,');
				if (ss.length > 1) {
					ss=Base64.decode(ss[1]);
					let img =g.firstChild;
					img.removeAttribute('xlink:href');
					/*let w=img.getAttribute('width');
					let h=img.getAttribute('height');
					let x=img.x;
					let y=img.y;*/
					let attrs=img.attributes;
					g.innerHTML=ss; 
					let ssvg=g.firstChild;
					
					//ssvg.removeAttribute('viewBox');
					ssvg.removeAttribute('id');
					for (var i = 0; i < attrs.length; i++) {
						var a = attrs[i];
						ssvg.setAttribute( a.name, a.value);
					}
				
					//ssvg.setAttribute('viewBox' ,'0 0 '+w+' '+h);

				}
			}
			for (var i = 0; i < state.cell.value.attributes.length; i++) {
				var attrib = state.cell.value.attributes[i];
				g.setAttribute(attrib.name, attrib.value);
			}
		}

		// Restores previous root
		canvas.root = prev;
	};

	return exp;
};


App.prototype.onBeforeUnload = function (e) {
	if (this.currentFile.modified == true) {
	}

}

var PsaveFile = App.prototype.saveFile;
App.prototype.saveFile = function (forceDialog, success) {
	/*var graph = this.editor.graph;
	var svgRoot = graph.getSvg(null, null, null, null, null, true)
	mxUtils.getXml(svgRoot);*/
	if (forceDialog) return PsaveFile.apply(this, arguments); // if coming from save as

	if (!_SC_PATH) return this.showAlert('Error: No file path');

	var name = this.currentFile.title;
	var xml = mxUtils.getXml(this.editor.getGraphXml());
	var svg = mxUtils.getXml(this.editor.graph.getSvg(null, 1, 0))

	new mxXmlRequest(SAVE_URL + '&path=' + _SC_PATH + '&',
		'&xml=' + encodeURIComponent(xml) + '&svg=' + encodeURIComponent(svg)).send();

	this.editor.setStatus(mxUtils.htmlEntities(_SC_PATH + ' - saved' + ' ' + new Date()));

	localStorage.setItem(_SC_PATH, xml);


	this.editor.setModified(false);
	this.currentFile.setModified(false);

	this.editor.setFilename(_SC_PATH);
	this.updateDocumentTitle();


	/*
		var r = PsaveFile.apply(this, arguments);
		console.log(mxUtils.getXml(svgRoot));
		console.log(this.getFileData(false, true));
		this.editor.setModified(false);
		this.editor.setFilename(name);
		this.updateDocumentTitle();
		console.log(this);
		
		*/
	return true;
};


/// Todo: _App.format.panels[].container means right sidebar tabs
//_App.format.selectionState means selected object 
// _App.format.update(); draw right panel
//Format.prototype.init can be override for tags binding or Format.prototype.updateSelectionStateForCell

