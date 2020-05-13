var hostName = window.location.hostname;		
urlParams["dev"]=hostName==="predixi.com"?0:1;
urlParams["offline"]=1;
urlParams["pages"]=0;


function getNodeIndex (element) {
    return Array.from(element.parentNode.childNodes).indexOf(element);
  }
