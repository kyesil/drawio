
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


mxSettings.settings.pageFormat = new mxRectangle(0, 0, 1900, 1000);//wecan set default file look _top.php
mxSettings.settings.customLibraries.push("U_pd/clibs/predixi_water.xml");

function fileloaded(app) {
	app.fname.innerHTML = _SC_PATH;
	//remove title click event:
	var fnameevents = app.fname.mxListenerList;
	app.fname.removeEventListener(fnameevents[0].name, fnameevents[0].f);
	app.fname.removeEventListener(fnameevents[1].name, fnameevents[1].f);

	var iconevents = app.appIcon.mxListenerList;
	app.appIcon.removeEventListener(iconevents[2].name, iconevents[2].f); //clear mouse hover/out şeysi
	app.appIcon.removeEventListener(iconevents[3].name, iconevents[3].f);


	app.appIcon.style.backgroundImage = "url('./_pd/css/img/back.svg')"; //mmanipulate header icon 
	app.appIcon.style.cursor = "pointer";

};

// for get global app variable  app variable also include EditorUi element
window._App = null;
var PdescriptorChanged = App.prototype.descriptorChanged;
App.prototype.descriptorChanged = function () {
	_App = this;
	var r = PdescriptorChanged.apply(this, arguments);
	fileloaded(this);

	//var dlg = new DevTagsDialog(this, null);
	//this.showDialog(dlg.container, 680, 600, true, false, null, false);
	//dlg.init();

	return r;
};

EditorUi.prototype.isOffline = function (ignoreStealth) {  // for pass app.js:4864 todo make it spacial
	return false;
};

App.prototype.appIconClicked = function (evt) {
	document.location.href = "/panel/node/" + urlParams["nscreen"] + "/" + urlParams["npage"];
}



var PshowDD = EditorUi.prototype.showDataDialog;
EditorUi.prototype.showDataDialog = function (cell) {
	if (!cell) return;
	console.log(new Date().getTime());
	let dlg;
	let str;
	if (typeof (cell.value) === 'string') str = cell.value;
	else if (typeof (cell.value) === 'object') str = cell.value.getAttribute('label');
	if (str) {
		//	const regex = /(?<!\\)(#+(\.)?#+)/gm;
		const regex = /(#+\.?#*)/gm; //lorem###.# ipsum # dolor### \# .###.#### sitamet
		let matchs = [];
		let match;
		//matchs = cell.value.match(regex); //get all match
		while ((match = regex.exec(str)) !== null) {
			matchs.push({ match: match, start: match.start, end: regex.lastIndex })
			console.log(`Found ${match[0]} start=${match.index} end=${regex.lastIndex}.`);
		}

		if (matchs.length > 0) dlg = new MyDataDialog(this, cell, 'text', matchs);

	} else
		if (cell.style) {
			let ss = cell.style.split('data:image/svg+xml,');
			if (ss.length > 1) {
				ss = ss[1].split(';')
				ss = Base64.decode(ss[0]);
				let esvg = document.createElement('svg');
				esvg.innerHTML = ss;
				esvg = esvg.firstChild;
				let stype = esvg.getAttribute('id');
				let sdata = esvg.getAttribute('data');
				dlg = new MyDataDialog(this, cell, stype, sdata);
			}
		}
	if (!dlg) dlg = new EditDataDialog(this, cell);//normal dialog
	this.showDialog(dlg.container, 480, 420, true, false, null, false);

	dlg.init();
	console.log(new Date().getTime());

};
Graph.prototype.addForeignObjectWarning = function (canvas, root) { }//we don't want this

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

//override create canvas for disable foreing object in svg. 
var Pcreatecanvas = Graph.prototype.createSvgCanvas;
Graph.prototype.createSvgCanvas = function (node) {
	var canvas = Pcreatecanvas.apply(this, arguments);
	canvas.foEnabled = false;//disable fo
	return canvas;
};




var dtags = [];
var MyDataDialog = function (ui, cell, ctype, cdata) {
	var div = document.createElement('div');
	var graph = ui.editor.graph;
	var dtags = []
	var value = graph.getModel().getValue(cell);

	var names = [];
	var texts = [];
	var count = 0;
	var id = (EditDataDialog.getDisplayIdForCell != null) ?
		EditDataDialog.getDisplayIdForCell(ui, cell) : null;



	// Converts the value to an XML node
	if (!mxUtils.isNode(value)) {
		var doc = mxUtils.createXmlDocument();
		var obj = doc.createElement('object');
		obj.setAttribute('label', value || '');
		value = obj;
	}
	var attrs = value.attributes;


	// Creates the dialog contents
	var form = new mxForm('properties');
	form.table.style.width = '100%';



	var addRemoveButton = function (text, name) {
		var wrapper = document.createElement('div');
		wrapper.style.position = 'relative';
		wrapper.style.paddingRight = '20px';
		wrapper.style.boxSizing = 'border-box';
		wrapper.style.width = '100%';

		var removeAttr = document.createElement('a');
		var img = mxUtils.createImage(Dialog.prototype.closeImage);
		img.style.height = '9px';
		img.style.fontSize = '9px';
		img.style.marginBottom = (mxClient.IS_IE11) ? '-1px' : '5px';

		removeAttr.className = 'geButton';
		removeAttr.setAttribute('title', mxResources.get('delete'));
		removeAttr.style.position = 'absolute';
		removeAttr.style.top = '4px';
		removeAttr.style.right = '0px';
		removeAttr.style.margin = '0px';
		removeAttr.style.width = '9px';
		removeAttr.style.height = '9px';
		removeAttr.style.cursor = 'pointer';
		removeAttr.appendChild(img);

		var removeAttrFn = (function (name) {
			return function () {
				var count = 0;

				for (var j = 0; j < names.length; j++) {
					if (names[j] == name) {
						texts[j] = null;
						form.table.deleteRow(count + ((id != null) ? 1 : 0));

						break;
					}

					if (texts[j] != null) {
						count++;
					}
				}
			};
		})(name);

		mxEvent.addListener(removeAttr, 'click', removeAttrFn);

		var parent = text.parentNode;
		wrapper.appendChild(text);
		wrapper.appendChild(removeAttr);
		parent.appendChild(wrapper);
	};

	var addTextArea = function (index, name, value) {
		names[index] = name;
		let tx = texts[index] = form.addTextarea(names[index] + ':', value, 2);
		tx.style.width = '100%';

		if (value.indexOf('\n') > 0) {
			tx.setAttribute('rows', '3');
		}
		if (name != "tags") addRemoveButton(tx, name);
		return tx;
	};

	var fields = [];
	var isLayer = graph.getModel().getParent(cell) == graph.getModel().getRoot();

	for (var i = 0; i < attrs.length; i++) {
		if ((isLayer || attrs[i].nodeName != 'label') && attrs[i].nodeName != 'placeholders') {
			fields.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
		}
	}



	// Sorts by name
	fields.sort(function (a, b) {
		if (a.name < b.name) {
			return -1;
		}
		else if (a.name > b.name) {
			return 1;
		}
		else {
			return 0;
		}
	});

	if (id != null) {
		var text = document.createElement('div');
		text.style.width = '100%';
		text.style.fontSize = '11px';
		text.style.textAlign = 'center';
		mxUtils.write(text, id);

		form.addField(mxResources.get('id') + ':', text);
	}

	if (!fields.some(t => t.name === 'tags')) {
		addTextArea(count++, 'tags', '');
	}
	for (var i = 0; i < fields.length; i++) {
		addTextArea(count, fields[i].name, fields[i].value);
		count++;
	}


	var getDTags = function (f) {
		fetch('/svcpdraw/gettags?nscreen=' + urlParams['nscreen'])
			.then(response => {
				return response.json();
			}).then(json => {
				dtags = json.data;
				for (let i = 0; i < texts.length; i++) {
					const tx = texts[i];

					if (names[i] == 'tags') autocomplete(tx, dtags, 'tag');
				}
			})
			.catch(err => {
				throw err;
			});
	}
	getDTags();



	var top = document.createElement('div');
	top.style.cssText = 'position:absolute;left:30px;right:30px;overflow-y:auto;top:30px;bottom:80px;';
	top.appendChild(form.table);

	var newProp = document.createElement('div');
	newProp.style.boxSizing = 'border-box';
	newProp.style.paddingRight = '160px';
	newProp.style.whiteSpace = 'nowrap';
	newProp.style.marginTop = '6px';
	newProp.style.width = '100%';

	var nameInput = document.createElement('input');
	nameInput.setAttribute('placeholder', mxResources.get('enterPropertyName'));
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('size', (mxClient.IS_IE || mxClient.IS_IE11) ? '36' : '40');
	nameInput.style.boxSizing = 'border-box';
	nameInput.style.marginLeft = '2px';
	nameInput.style.width = '100%';

	newProp.appendChild(nameInput);
	top.appendChild(newProp);
	div.appendChild(top);

	var addBtn = mxUtils.button(mxResources.get('addProperty'), function () {
		var name = nameInput.value;

		// Avoid ':' in attribute names which seems to be valid in Chrome
		if (name.length > 0 && name != 'label' && name != 'placeholders' && name.indexOf(':') < 0) {
			try {
				var idx = mxUtils.indexOf(names, name);

				if (idx >= 0 && texts[idx] != null) {
					texts[idx].focus();
				}
				else {
					// Checks if the name is valid
					var clone = value.cloneNode(false);
					clone.setAttribute(name, '');

					if (idx >= 0) {
						names.splice(idx, 1);
						texts.splice(idx, 1);
					}

					names.push(name);
					var text = form.addTextarea(name + ':', '', 2);
					text.style.width = '100%';
					texts.push(text);
					addRemoveButton(text, name);

					text.focus();
				}

				addBtn.setAttribute('disabled', 'disabled');
				nameInput.value = '';
			}
			catch (e) {
				mxUtils.alert(e);
			}
		}
		else {
			mxUtils.alert(mxResources.get('invalidName'));
		}
	});

	this.init = function () {
		if (texts.length > 0) {
			texts[0].focus();
		}
		else {
			nameInput.focus();
		}
	};

	addBtn.setAttribute('title', mxResources.get('addProperty'));
	addBtn.setAttribute('disabled', 'disabled');
	addBtn.style.textOverflow = 'ellipsis';
	addBtn.style.position = 'absolute';
	addBtn.style.overflow = 'hidden';
	addBtn.style.width = '144px';
	addBtn.style.right = '0px';
	addBtn.className = 'geBtn';
	newProp.appendChild(addBtn);

	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function () {
		ui.hideDialog.apply(ui, arguments);
	});

	cancelBtn.className = 'geBtn';

	var applyBtn = mxUtils.button(mxResources.get('apply'), function () {
		try {
			ui.hideDialog.apply(ui, arguments);

			// Clones and updates the value
			value = value.cloneNode(true);
			var removeLabel = false;

			for (var i = 0; i < names.length; i++) {
				if (texts[i] == null) {
					value.removeAttribute(names[i]);
				}
				else {
					value.setAttribute(names[i], texts[i].value);
					removeLabel = removeLabel || (names[i] == 'placeholder' &&
						value.getAttribute('placeholders') == '1');
				}
			}

			// Removes label if placeholder is assigned
			if (removeLabel) {
				value.removeAttribute('label');
			}

			// Updates the value of the cell (undoable)
			graph.getModel().setValue(cell, value);
		}
		catch (e) {
			mxUtils.alert(e);
		}
	});
	applyBtn.className = 'geBtn gePrimaryBtn';

	function updateAddBtn() {
		if (nameInput.value.length > 0) {
			addBtn.removeAttribute('disabled');
		}
		else {
			addBtn.setAttribute('disabled', 'disabled');
		}
	};

	mxEvent.addListener(nameInput, 'keyup', updateAddBtn);

	// Catches all changes that don't fire a keyup (such as paste via mouse)
	mxEvent.addListener(nameInput, 'change', updateAddBtn);

	var buttons = document.createElement('div');
	buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:30px;height:40px;'

	if (ui.editor.graph.getModel().isVertex(cell) || ui.editor.graph.getModel().isEdge(cell)) {
		var replace = document.createElement('span');
		replace.style.marginRight = '10px';
		var input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.style.marginRight = '6px';

		if (value.getAttribute('placeholders') == '1') {
			input.setAttribute('checked', 'checked');
			input.defaultChecked = true;
		}

		mxEvent.addListener(input, 'click', function () {
			if (value.getAttribute('placeholders') == '1') {
				value.removeAttribute('placeholders');
			}
			else {
				value.setAttribute('placeholders', '1');
			}
		});

		replace.appendChild(input);
		mxUtils.write(replace, mxResources.get('placeholders'));

		if (EditDataDialog.placeholderHelpLink != null) {
			var link = document.createElement('a');
			link.setAttribute('href', EditDataDialog.placeholderHelpLink);
			link.setAttribute('title', mxResources.get('help'));
			link.setAttribute('target', '_blank');
			link.style.marginLeft = '8px';
			link.style.cursor = 'help';

			var icon = document.createElement('img');
			mxUtils.setOpacity(icon, 50);
			icon.style.height = '16px';
			icon.style.width = '16px';
			icon.setAttribute('border', '0');
			icon.setAttribute('valign', 'middle');
			icon.style.marginTop = (mxClient.IS_IE11) ? '0px' : '-4px';
			icon.setAttribute('src', Editor.helpImage);
			link.appendChild(icon);

			replace.appendChild(link);
		}

		buttons.appendChild(replace);
	}

	if (ui.editor.cancelFirst) {
		buttons.appendChild(cancelBtn);
		buttons.appendChild(applyBtn);
	}
	else {
		buttons.appendChild(applyBtn);
		buttons.appendChild(cancelBtn);
	}

	div.appendChild(buttons);
	this.container = div;
};


