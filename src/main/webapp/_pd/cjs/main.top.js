var hostName = window.location.hostname;		
urlParams["dev"]=hostName==="predixi.com"?0:1;
urlParams["offline"]=1;
urlParams["pages"]=0;


function getNodeIndex (element) {
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
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}