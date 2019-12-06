const mongoose = require("mongoose");
const reservationModel = require("./reservation.model");

const Schema = mongoose.Schema;

const restaurantModel = new Schema({
    name: { 
        type: String, 
        required: [
            true, 
            "Restaurant name is required!"
        ],
        unique: true 
    },
    normal_name: {
        type: String,
        lowercase: true,
        trim: true
    },
    location: {
        type: String,
        required: [
            true, 
            "Restaurant location is required!"
        ]
    },
    tables: { 
        type: Number, 
        required: [
            true, 
            "Number of tables is required!"
        ]
    },
    tables_reserved: {
        type: Number, 
        default: 0 
    },
    current_reservations: {
        type: Number,
        default: 0 
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    },
    updated_at: {
        type: Date, 
        default: Date.now() 
    },
    reservations: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "Reservation" 
        }
    ],
});

const Restaurant = mongoose.model("Restaurant", restaurantModel);
module.exports = Restaurant;