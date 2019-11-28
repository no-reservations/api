const router = require("express").Router();

const restaurant = require("./controllers/restaurant");
const reservation = require("./controllers/reservation");

module.exports = function routes(app) {
    
    app.get("/restaurants/:restaurant", restaurant.view);
    app.get("/restaurants/:restaurant/reservations", restaurant.get_reservations);
    app.get("/restaurants/:restaurant/reservations/:reservation");
    
    app.post("/restaurants/new", restaurant.create);
    app.post("/restaurants/:restaurant/reservations/new");
    
    app.put("/restaurants/:restaurant/update");
    
    app.delete("/restaurants/:restaurant/remove", restaurant.delete_one);

}
