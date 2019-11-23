const restaurant = require("./controllers/restaurant");
const reservation = require("./controllers/reservation");

module.exports = function routes(app) {

    app.get("/restaurant")
    app.post("/restaurant")
    app.put("/restaurant")
    app.delete("/restaurant")

    app.get("/reservation")
    app.post("/reservation")
    app.put("/reservation")
    app.delete("/reservation")
}