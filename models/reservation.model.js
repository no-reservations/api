"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationModel = new Schema({
    start: { 
        type: Date, 
        required: [
            true, 
            "Start time is required!"
        ] 
    },
    end: { 
        type: Date, 
        required: [
            true, 
            "End time is required"
        ]
    },
    restaurant: { 
        type: Schema.Types.ObjectId, 
        ref: "Restaurant",
        required: [
            true, 
            "Restaurant for reservation is required!"
        ]
    },
    name: { 
        type: String, 
        required: [
            true, 
            "Name for reservation is required!"
        ]
    },
    // Guest: { type: Schema.Types.ObjectId, ref: "Guest", required: [true, "Guest for reservation is required!"] },
    party_size: { 
        type: Number, 
        required: [
            true, 
            "Party size is required!"
        ], 
        min: 0 
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    },
    updated_at: {
        type: Date, 
        default: Date.now() 
    },
});

const Reservation = mongoose.model("Reservation", reservationModel);
module.exports = Reservation;