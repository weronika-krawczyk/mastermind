class Plansza {
    constructor() {
        this.x = 0
        this.minute = 0
        this.time
        this.czas = 0
        this.score = 0
        this.tablica_wynikow()
    }
    gra() {
        $.ajax({
            url: "/gra",
            data: {
                action: "gra"
            },
            type: "POST",
            success: (data) => {
                console.log(data)
                if (data == "pierwszy") {
                    content.kwadraciki1()
                    content.pole_gry()
                    content.bialekule()
                    content.player = "pierwszy"

                }
                else {
                    content.kwadraciki2()
                    content.pole_gry()
                    content.szarekule()
                    var int = setInterval(() => {
                        console.log("sprawdzenie")
                        plansza.sprawdzenie(int)
                    }, 1000);
                    content.player = "drugi"
                    var int1 = setInterval(() => {
                        console.log("zapytanie o koniec")
                        plansza.zapytania_drugi(int1)
                    }, 1000);
                }
                var wyniki = $("<button>")
                $("#root").append(wyniki)
                $(wyniki).append("SCOREBOARD")
                $(wyniki).prop('id', 'wyniki')
                var cos = false
                $(wyniki).on("click", () => {
                    this.tablica_wynikow()
                    if (!cos) {
                        var scoreboard = $("<div>")
                        scoreboard.append("LAST 10 TIMES" + "<br>")
                        console.log(this.score.docs.length);
                        for (let i = 0; i < this.score.docs.length; i++) {
                            scoreboard.append(this.score.docs[i].czas + "<br>")
                        }
                        $("#root").append(scoreboard)
                        $(scoreboard).prop('id', 'scoreboard')
                        cos = true
                    }
                    else {
                        console.log("cos = true");
                        var scoreboard2 = document.getElementById("scoreboard")
                        scoreboard2.remove()
                        cos = false
                    }


                })

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    wysylanieKolorow(kolory) {
        console.log("Wysyłanie kolorów AJAX")
        console.log(kolory)
        $.ajax({
            url: "/wysylanieKolorow",
            data: {
                kolory: kolory
            },
            type: "POST",
            success: function (data) {
                // console.log(data)
                this.zmiana != this.zmiana
                content.zmiana_gracza(this.zmiana)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }

    sprawdzenie(int) {
        $.ajax({
            url: "/sprawdzenie",
            data: {
                spr: "Czy użytkownik jest gotowy?"
            },
            type: "POST",
            success: (data) => {
                if (data == "Pzegrana") {
                    window.alert("Pzegrana!")
                }
                console.log(data)
                data = data.split("/")
                if (data[0] == "Możesz grać") {
                    this.czas_gry()
                    window.clearInterval(int)
                    console.log(data[1])
                    content.nastepneKule(data[1])
                    this.zmiana = false
                    content.zmiana_gracza(this.zmiana)
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }

    czas_gry() {
        let h1_czas = $("<h1>")
        $(h1_czas).prop("id", "h1_czas")
        $("#root").append(h1_czas)
        this.czas = setInterval(() => {
            console.log("czas")
            if (this.x <= 9) {
                this.time = "0" + this.minute + ":0" + this.x
                $(h1_czas).text(this.time)
            }
            else if (this.x > 9 && this.x <= 59) {
                this.time = "0" + this.minute + ":" + this.x
                $(h1_czas).text(this.time)
            }
            else if (this.x == 60) {
                this.minute++
                this.time = "0" + this.minute + ":00"
                $(h1_czas).text(this.time)
                this.x = 0
            }
            this.x++
        }, 1000);
    }

    czekaj_zmiana(int, player) {
        $.ajax({
            url: "/czekaj",
            data: {
                player: player
            },
            type: "POST",
            success: (data) => {
                if (player == "pierwszy") {
                    if (data == "Przegrana") {
                        window.clearInterval(int)
                        let div = $("<div>")
                        $(div).prop("id", "koniec_gry")
                        let h1 = $("<h1>")
                        h1.append("YOU WON :)")
                        let restart = $("<button>")
                        $(restart).prop("id", "restart")
                        $(restart).on("click", () => {
                            window.location.reload()
                        })
                        $(restart).append("RESTART")
                        div.append(h1)
                        div.append(restart)
                        $(document.body).append(div)
                        $("#root").remove()
                        $("#root").append(h1)
                    }
                    else if (data == "Wygrana") {
                        window.clearInterval(int)
                        let div = $("<div>")
                        $(div).prop("id", "koniec_gry")
                        let h1 = $("<h1>")
                        h1.append("YOU LOST :(")
                        let restart = $("<button>")
                        $(restart).prop("id", "restart")
                        $(restart).on("click", () => {
                            window.location.reload()
                        })
                        $(restart).append("RESTART")
                        div.append(h1)
                        div.append(restart)
                        $(document.body).append(div)
                        $("#root").remove()
                        var z = 0
                        var refresh = setInterval(() => {
                            this.tablica_wynikow()
                            z++
                            if (z == 5) {
                                window.clearInterval(refresh)
                            }
                        }, 100);

                    }
                }

                if (data.split("/")[0] == "Możesz grać") {
                    window.clearInterval(int)
                    content.nastepneKule(data.split("/")[1])
                    content.koloroweKule(data.split("/")[1], JSON.parse(data.split("/")[2]))
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }
    zapytania_drugi(int1) {
        $.ajax({
            url: "/zapytania_drugi",
            data: {
                player: "drugi"
            },
            type: "POST",
            success: (data) => {
                if (data == "Przegrana") {
                    let div = $("<div>")
                    $(div).prop("id", "koniec_gry")
                    let h1 = $("<h1>")
                    h1.append("YOU LOST :((")
                    let restart = $("<button>")
                    $(restart).prop("id", "restart")
                    $(restart).on("click", () => {
                        window.location.reload()
                    })
                    $(restart).append("RESTART")
                    div.append(h1)
                    div.append(restart)
                    $(document.body).append(div)
                    $("#root").remove()
                    window.clearInterval(int1)
                    window.clearInterval(this.czas)
                    $("#h1_czas").text("")

                }
                else if (data == "Wygrana") {
                    let div = $("<div>")
                    let h1 = $("<h1>")
                    h1.append("YOU WON :)")
                    $(div).prop("id", "koniec_gry")
                    let restart = $("<button>")
                    $(restart).prop("id", "restart")
                    $(restart).on("click", () => {
                        window.location.reload()
                    })
                    $(restart).append("RESTART")
                    div.append(h1)
                    div.append(restart)
                    $(document.body).append(div)
                    $("#root").remove()
                    this.wyslanie_koncowego_czasu()
                    window.clearInterval(int1)
                    window.clearInterval(this.czas)
                    $("#h1_czas").text("")
                    this.tablica_wynikow()
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }

    wyslanie_koncowego_czasu() {
        $.ajax({
            url: "/wyslanie_koncowego_czasu",
            data: {
                czas: this.time
            },
            type: "POST",
            success: (data) => {
                console.log(data);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }

    tablica_wynikow() {
        $.ajax({
            url: "/tablica_wynikow",
            type: "POST",
            success: (data) => {
                this.score = data
                console.log(this.score);
                this.score = JSON.parse(this.score)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }
}


