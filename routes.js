const router = require("express").Router();

const restaurant = require("./controllers/restaurant");
const reservation = require("./controllers/reservation");

module.exports = function routes(app) {
    
    app.get("/restaurants/all", restaurant.get_restaurants);
    app.get("/restaurants/:restaurant", restaurant.get_restaurant);
    app.get("/restaurants/:restaurant/reservations", reservation.get_reservations);
    app.get("/restaurants/:restaurant/reservations/:reservation", reservation.get_reservation);
    
    app.post("/restaurants/new", restaurant.create_restaurant);
    app.post("/restaurants/:restaurant/reservations/new", reservation.create_reservation);
    
    app.put("/restaurants/:restaurant/update");
    app.put("restaurants/:restaurant/reservations/:reservation/update")
    
    app.delete("/restaurants/:restaurant/remove", restaurant.delete_restaurant);

}
