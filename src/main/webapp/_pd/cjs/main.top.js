let hn = window.location.hostname;
urlParams["dev"] = hn === "predixi.com" ? 0 : 1;
urlParams["offline"] = 1;
urlParams["pages"] = 0;



function getNodeIndex(element) {
    return Array.from(element.parentNode.childNodes).indexOf(element);
}
function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
 text = text.replace(new RegExp('<br>', 'g'), "<br/>");
    return text;
}

function clearSvg(elem) {
    let elems = elem.children;
//todo remove switch elem

    /*if (elems.length > 0)
        for (let i = 0; i < elems.length; i++) {
            const e = elems[i];
            let sstyle = "";
            let dy = "";
            if (e.children.length > 0) clearSvg(e);
            if (e.tagName === "font") {
                let fc = e.getAttribute('color');
                sstyle = sstyle + (fc ? "fill:" + fc+ ";": "");
            }
            else if (e.tagName === "span") sstyle = sstyle + "";
            else if (e.tagName === "b") sstyle = sstyle + "font-weight:bold;";
            else if(e.tagName === "h1") sstyle = sstyle + "font-size: 2em;font-weight:bold;";
            else if(e.tagName === "p") sstyle = sstyle + "font-size: 1em;";
            else if(e.tagName === "br") dy="1.2em"
            else continue;
            let s = e.getAttribute('style');
            if (s) sstyle = sstyle + e.getAttribute('style');

            if (sstyle) sstyle = sstyle.replace('color', 'fill');

            e.outerHTML = '<tspan style="' + sstyle + '" dy="'+dy+'">' + e.innerHTML + '</tspan>';
        }*/

}

//text input to autocomplete text input for dtag selection
function autocomplete(inp, acarr, aprop) {
    /*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
    if (!acarr || acarr.length < 1) return;
    if (inp.tagName.toLowerCase() == 'textarea')
        inp.setAttribute('rows', 1 + Math.floor(inp.value.length / 37));
    var currentFocus;
    var wrapper = document.createElement('div'), eiwrapper, eitems;
    // insert wrapper before el in the DOM tree
    inp.parentNode.insertBefore(wrapper, inp);
    // move el into wrapper
    wrapper.appendChild(inp);
    wrapper.className = 'acin';
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var arrpos = 0, vals = this.value.split(',');
        if (vals.length > 1) {
            let curpos = this.value.slice(0, this.selectionStart).length;
            let arrcount = 0;
            for (let j = 0; j < vals.length; j++) {
                const v = vals[j];
                arrcount += v.length + 1;
                if (arrcount > curpos) { arrpos = j; break; }
            }
            val = vals[arrpos];
        }
        else val = vals[0];
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        var arr = acarr.filter((ar) => {
            return ar[aprop].toLowerCase().indexOf(val.toLowerCase()) > -1;
        });
        if (arr.length < 1) return false;
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        eiwrapper = document.createElement("DIV");

        eiwrapper.setAttribute("class", "acin-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(eiwrapper);
        /*for each item in the array...*/
        for (let i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) 
            {

                /*create a DIV element for each matching element:*/
                var eitem = document.createElement("DIV");
                eitem.setAttribute('data', arr[i][aprop]);
                /*make the matching letters bold:*/
                //b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                eitem.innerHTML = arr[i][aprop].replace(val, '<b>' + val + '</b>');
                /*insert a input field that will hold the current array item's value:*/
                //b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                eitem.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/

                    vals[arrpos] = this.getAttribute("data");
                    inp.value = vals.join(',')
                    if (inp.value && inp.value[inp.value.length - 1] !== ',')
                        inp.value += ',';
					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
                    closeAllLists();
                    if (inp.tagName.toLowerCase() == 'textarea')
                        inp.setAttribute('rows', 1 + Math.floor(inp.value.length / 37));
                });
                eiwrapper.appendChild(eitem);
            }
        }

        eitems = wrapper.querySelectorAll(".acin-items div");
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        if (e.keyCode > 40) return;
        if (!eitems) return false;
        if (e.keyCode == 40) {
            currentFocus++;
            addActive();
        } else if (e.keyCode == 38) { //up	
            currentFocus--;
            addActive();
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                eitems[currentFocus].click();
            } else if (eitems.length == 1) eitems[0].click();
        }
    });
    function addActive() {
        for (var i = 0; i < eitems.length; i++) {
            eitems[i].classList.remove("acin-active");
        }
        if (currentFocus >= eitems.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (eitems.length - 1);
        /*add class "autocomplete-active":*/
        eitems[currentFocus].classList.add("acin-active");
    }
    function closeAllLists() {
        if (eiwrapper) eiwrapper.innerHTML = "";
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists();
    });
}