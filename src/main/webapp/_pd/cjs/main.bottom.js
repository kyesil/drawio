

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
		else if (mxUtils.isNode(state.cell.value) || typeof(state.cell.value)==="string") {
			//g.setAttribute('content', mxUtils.getXml(state.cell.value));
			if (state.style.image) {
				let ss = state.style.image.split('data:image/svg+xml;base64,');
				if (ss.length > 1) {
					ss = Base64.decode(ss[1]);

					let gi = getNodeIndex(g);
					ss = ss.replace(/\.cls-/g, '.cls' + gi + '-').replace(/\"cls-/g, '"cls' + gi + '-').
						replace(/\"clip-path/g, '"clip-path' + gi).replace(/\#clip-path/g, '#clip-path' + gi).
						replace(/\"radial-gradient/g, '"radial-gradient' + gi).replace(/\#radial-gradient/g, '#radial-gradient' + gi).
						replace(/\&#xa;/g, '');
					let eimg = g.firstChild;

					let w = eimg.getAttribute('width');
					let h = eimg.getAttribute('height');
					let x = eimg.getAttribute('x');
					let y = eimg.getAttribute('y');
					let t = eimg.getAttribute('transform');

					g.innerHTML = ss;
					let esvg = g.firstChild;

					esvg.removeAttribute('id');
					esvg.removeAttribute('xmlns:xlink');
					esvg.removeAttribute('xmlns');

					esvg.setAttribute('width', w);
					esvg.setAttribute('height', h);
					esvg.setAttribute('x', x);
					esvg.setAttribute('y', y);

					//	g.setAttribute('transform',t); //we can't transform svg :(

					//esvg.setAttribute('viewBox' ,'0 0 '+w+' '+h);

				}
			} else {
				g.innerHTML = decodeHTMLEntities(g.innerHTML);
				let espan = g.getElementsByTagName('span');
				console.log(g.innerHTML);
				for (let i = 0; i < espan.length; i++) {
					const e = espan[i];
					let sstyle = e.getAttribute('style');
					if(sstyle) sstyle=sstyle.replace('color','fill');
					let sparent = e.parentNode;
					sparent.innerHTML=e.innerHTML;
					sparent.setAttribute('style',sstyle);
					console.log(sparent.innerHTML);
				}
			
				/*//<span(.)+<?span>
						const regex = /\<span *style="(.*)" *\>(.*)\<\/span\>/gm; //lorem###.# ipsum # dolor### \# .###.#### sitamet
						let matchs = [];
						while ((match = regex.exec(ghtml)) !== null) {
							matchs.push({ match: match, start: match.start, end: regex.lastIndex })
							console.log(`Found ${match[0]} start=${match.index} end=${regex.lastIndex}.`);
						}
						//matchs = ghtml.match(regex); //get all match
						console.log(decodeHTMLEntities(ghtml));
						console.log(matchs);*/
			}
if(state.cell.value.attributes)
			for (let i = 0; i < state.cell.value.attributes.length; i++) {
				let attrib = state.cell.value.attributes[i];
				if (attrib.name === 'label') continue;
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
	var svg = decodeHTMLEntities(this.editor.graph.getSvg(null, 1, 0).outerHTML);
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

