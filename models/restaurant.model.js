const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantModel = new Schema({
    name: { type: String, required: true, unique: true },
    normal_name: String,
    location: String,
    tables: { type: Number, required: true },
    tables_reserved: Number,
    current_reservations: Number,
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

const Restaurant = mongoose.model("restaurant", restaurantModel);
module.exports = Restaurant;