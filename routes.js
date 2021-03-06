"use strict";

const router = require("express").Router();

const restaurant = require("./controllers/restaurant.controller");
const reservation = require("./controllers/reservation.controller");
const user = require("./controllers/user.controller");

const token_middleware = require("./middlewares/jwt");

module.exports = function routes(app) {
    
    // TODO: Use token middleware to ensure we're the correct user
    app.get("/users/:user_id", user.get_user);
    app.get("/restaurants/all", restaurant.get_restaurants);
    app.get("/restaurants/:restaurant_id", restaurant.get_restaurant);
    app.get("/restaurants/:restaurant_id/reservations", reservation.get_reservations);
    app.get("/restaurants/:restaurant_id/reservations/:reservation_id", reservation.get_reservation);
    
    app.post("/users/new", user.create_user);
    app.post("/restaurants/new", restaurant.create_restaurant);
    app.post("/restaurants/:restaurant_id/reservations/new", reservation.create_reservation);
    
    app.put("/users/:user_id/update", user.update_user);
    app.put("/restaurants/:restaurant_id/update", restaurant.update_restaurant);
    app.put("/restaurants/:restaurant_id/reservations/:reservation_id/update", reservation.update_reservation)
    
    app.delete("/users/:user_id/remove", user.delete_user);
    app.delete("/restaurants/:restaurant_id/remove", restaurant.delete_restaurant);

}
