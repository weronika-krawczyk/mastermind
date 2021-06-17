console.log("AA");
class Start {
    constructor() {
        this.clicks()
    }
    clicks() {
        $("#start_gry").on("click", function () {
            plansza.gra()
            $("#start_gry").remove()
        })
    }
}