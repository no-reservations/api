const restaurant = require("./controllers/restaurant");
const reservation = require("./controllers/reservation");

module.exports = function routes(app) {

    // app.get("/restaurant/all");
    app.get("/restaurant/:restaurant", restaurant.view);
    app.post("/restaurant", restaurant.create);
    app.put("/restaurant");
    app.delete("/restaurant");

    app.get("/reservation");
    app.post("/reservation");
    app.put("/reservation");
    app.delete("/reservation");
}