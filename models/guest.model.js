"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestModel = new Schema({
    firstname: { 
        type: String,
        required: [
            true,
            "firstname must be given!"
        ]
    },
    lastname: { 
        type: String,
    },
    // Add validator for phone number.
    // Note: This fails for int'l stuff
    // See: https://mongoosejs.com/docs/validation.html#custom-validators
    phone_number: {
        type: String,
        validate: {
            validator: v => {
                Promise.resolve(/\d{3}-\d{3}-\d{4}/.test(v));
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [
            true, 
            "User phone number required"
        ]
    },
    reservations: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "Reservation" 
        }
    ],
    created_at: { 
        type: Date, 
        default: Date.now() 
    },
    updated_at: {
        type: Date, 
        default: Date.now() 
    },
});

const Guest = mongoose.model("Guest", guestModel);
module.exports = Guest;