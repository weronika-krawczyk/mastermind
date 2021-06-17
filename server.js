var express = require("express")
var app = express()
const PORT = 3000;
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
var path = require("path")
app.use(express.static('static'))
var tab = []
var tab1 = []
var flaga = true
var sprawdzenie1 = true
var sprawdzenie2 = true
var numerRundy = 0
var zapytania = 0
var Datastore = require('nedb')

var gradb = new Datastore({
    filename: 'gra.db',
    autoload: true
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
    console.log(__dirname)
})
app.post("/gra", function (req, res) {
    console.log((req.body.action))
    if (flaga) {
        res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
        res.end("pierwszy");
        flaga = false
    }
    else {
        res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
        res.end("drugi");
        flaga = true
    }

})

app.post("/wysylanieKolorow", function (req, res) {
    console.log("wyslaniekolorow")
    if (tab.length == 0) {
        tab1 = req.body.kolory
        console.log(tab1 + "tablica");
        tab = [1]
    }
    else {
        tab = req.body.kolory
        console.log(tab)
    }
    res.end("Odebrano kolory")
    if (sprawdzenie1) {
        sprawdzenie1 = false
        sprawdzenie2 = true
    }
    if (numerRundy == 0) {
        numerRundy++
    }

})

app.post("/sprawdzenie", function (req, res) {
    if (numerRundy < 10) {
        if (sprawdzenie2 != sprawdzenie1) {
            console.log("granieee")
            sprawdzenie1 = true
            res.end("Możesz grać/" + numerRundy)
        }
        else {
            res.end("Nie możesz grać")
        }
    }
    else {
        res.end("Przegrana")
    }
})

app.post("/czekaj", function (req, res) {
    console.log(tab, tab1, " tablice ");
    if (numerRundy < 11) {
        if (JSON.stringify(tab1) == JSON.stringify(tab)) {
            console.log("wygrano tablice takie same ");
            res.end("Wygrana")
            zapytania = 2
            tab1 = req.body.kolory
            tab = []
        }
        else if (sprawdzenie2 != sprawdzenie1) {
            if (req.body.player == "drugi") {
                numerRundy++
            }
            sprawdzenie1 = true
            res.end("Możesz grać/" + numerRundy + "/" + JSON.stringify(tab))
        }
        else {
            res.end("Nie możesz grać")
        }
    }
    else {
        res.end("Przegrana")
        tab = []
        zapytania = 1
    }
})

app.post("/zapytania_drugi", function (req, res) {
    if (zapytania == 0) {
        res.end("Nic")
    }
    else if (zapytania == 1) {
        res.end("Przegrana")
        zapytania = 0
        numerRundy = 0
    }
    else if (zapytania == 2) {
        res.end("Wygrana")
        zapytania = 0
        numerRundy = 0
    }
})

app.post("/wyslanie_koncowego_czasu", function (req, res) {
    console.log(req.body.czas);
    var baza = {
        czas: req.body.czas,
        pierwsze_kolory: tab1
    };
    gradb.insert(baza, function (err, newDoc) {
        console.log("dodano dokument (obiekt):")
        console.log(newDoc)
        console.log("losowe id dokumentu: " + newDoc._id)
    });
})

app.post("/tablica_wynikow", function (req, res) {
    gradb.find({}, function (err, docs) {
        //zwracam dane w postaci JSON
        console.log(JSON.stringify({ docs }, null, 5))
        res.end(JSON.stringify({ docs }, null, 5))
    });

})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})