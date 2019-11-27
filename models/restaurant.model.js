const mongoose = require("mongoose");
const reservationModel = require("./reservation.model");

const Schema = mongoose.Schema;

const restaurantModel = new Schema({
    name: { type: String, required: [true, "Restaurant name is required!"], unique: true },
    normal_name: { type: String, lowercase: true, trim: true},
    location: String,
    tables: { type: Number, required: [true, "Number of tables is required!"] },
    tables_reserved: Number,
    current_reservations: Number,
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const Restaurant = mongoose.model("Restaurant", restaurantModel);
module.exports = Restaurant;