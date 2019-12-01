var app = new Vue({
    el: '#app',
    data: {
        screens: [],
        pages: [],
        vpage: "screens",
        vtitle: "",
        pid: 0,
        sid: 0,
        form: []

    },
    mounted() {

        loadScreens();
    },
    methods: {
        scOpenClick: function (id) {
            app.sid = id;
            loadPages(app.sid);
        },
        scEditClick: function (id) {
            app.sid = id;
            app.vtitle = "Edit/Remove";
            app.vpage = "addsc";
            app.dtitle = "Edit Screen:" + app.screens[app.sid].name;
            app.form = app.screens[app.sid];

        },
        pgDrawClick: function (id) {

            var ssid = app.pages[id].sid;
            window.open("../src/main/webapp/index.php?pid=" + ssid + "_" + id);
        },
        pgEditClick: function (id) {
            app.pid = id;
            app.vtitle = "Edit/Remove";
            app.vpage = "addpg";
            app.dtitle = "Edit Page:" + app.pages[app.pid].name + " from " + app.screens[app.sid].name;

            app.form = app.pages[app.pid];

        }
    }
})


function refreshClick() {
    if (app.vpage == "screens") {
        loadScreens();
    }
    else if (app.vpage == "pages") {

        loadPages(app.sid);
    }
}
function saveClick(id) {
    if (app.vpage == "addsc") {
        saveScreen(app.sid);
    }
    else if (app.vpage == "addpg") {
        savePage(app.pid);
    }

}
function delClick() {
    if (app.vpage == "addsc") {
        if (confirm("Delete Screen ?:" + app.screens[app.sid].name + "(#" + app.sid + ")"))
            delScreen(app.sid);
    }
    else if (app.vpage == "addpg") {
        if (confirm("Delete Page ?:" + app.pages[app.pid].name + "(#" + app.pid + ")"))
            delPage(app.pid);

    }
    console.log(app.form);
}

function backClick(param) {
    if (app.vpage == "addpg") {
        loadPages(app.sid);

    } else {
        loadScreens(0);

    }
}

function addClick(id) {
    app.vtitle = "Add/Edit/Remove";
    app.form = {};
    if (app.vpage == "screens") {
        app.sid = 0;
        app.dtitle = "Add Screen";
        app.vpage = "addsc";
    }
    else if (app.vpage == "pages") {
        app.vpage = "addpg";
        app.pid = 0;
        app.form.sid =  app.sid;
        app.dtitle = "Add Page to: " + app.screens[app.sid].name;
    }
}

function loadScreens(id) {
    fetch('_dbaction.php?action=getsclist&param=' + id)
        .then(res => res.json())
        .then(json => {
            app.vpage = "screens";
            app.vtitle = "Screens";
            data = {};
            if (json.data) {
                for (const j in json.data)
                    data[json.data[j].id] = json.data[j];
                app.screens = data;
            }
            console.log(data);
        })
        .catch(error => {
            console.log('Error Load Screen Request', error)
        });
}

function loadPages(id) {
    fetch('_dbaction.php?action=getpglist&param=' + id)
        .then(res => res.json())
        .then(json => {
            app.vpage = "pages";
            app.vtitle = "Pages for <b>" + app.screens[id].name + "</b>";
            data = {};
            if (json.data) {
                for (const j in json.data)
                    data[json.data[j].id] = json.data[j];
                app.pages = data;
            }
            console.log(data);
        })
        .catch(error => {
            console.log('Error Load Page Request', error)
        });
}

function savePage(id) { 
    var ss="";
    if(app.form.id!=undefined  ) ss='&id='+app.form.id;
    fetch('_dbaction.php?action=savepg'+ss+'&sid='+app.form.sid+
    '&name='+app.form.name+'&type='+app.form.type)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.data) {
                if (id > 0)
                    alert("Saved Page:" + app.form.name + "(" + id + ")");
                else alert("Added Page:" + app.form.name);
                app.pages[id] = app.form;
                loadPages(app.sid);
            }
        })
        .catch(error => {
            console.log('Error Load Request', error)
        });
}

function saveScreen(id) {
    var ss="";
    if(app.form.id!=undefined  ) ss='&id='+app.form.id;
    fetch('_dbaction.php?action=savesc'+ss+'&name='+app.form.name+
    '&authpath='+app.form.authpath+'&type='+app.form.type)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.data) {
                if (id > 0)
                    alert("Saved Screen:" + app.form.name + "(" + id + ")");
                else alert("Added Screen:" + app.form.name);
                app.screen[id] = app.form;
                loadScreens(0);
            }
        })
        .catch(error => {
            console.log('Error Load Request', error)
        });
}

function delScreen(id) {
    fetch('_dbaction.php?action=delsc&id=' + id)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.data) {
                alert("Deleted Screen:" + app.screens[id].name + "(" + id + ")");
                //delete app.screens[id];
                loadScreens(0);
            }
        })
        .catch(error => {
            console.log('Error Request', error)
        });
}

function delPage(id) {
    fetch('_dbaction.php?action=delpg&id=' + id)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.data) {
                alert("Deleted Page:" + app.pages[id].name + "(" + id + ")");
                //delete app.pages[id];
                loadPages(app.sid);
            }
        })
        .catch(error => {
            console.log('Error Load Request', error)
        });
}