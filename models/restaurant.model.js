const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantModel = new Schema({
    name: { type: String, required: true },
    location: String,
    tables: { type: Integer, required: true },
    tables_reserved: Integer,
    current_reservations: Integer,
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

const Restaurant = mongosse.model("restaurant", restaurantModel);
module.exports = Restaurant;