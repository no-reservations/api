const router = require("express").Router();

const restaurant = require("./controllers/restaurant");
const reservation = require("./controllers/reservation");

module.exports = function routes(app) {
    
    app.get("/restaurants/:restaurant", restaurant.view);
    app.post("/restaurants/new", restaurant.create);
    app.put("/restaurants/update");
    app.delete("/restaurants/remove", restaurant.delete_one);

    app.get("/reservation");
    app.post("/reservation");
    app.put("/reservation");
    app.delete("/reservation");
}
