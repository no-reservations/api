const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerModel = new Schema({
    firstname: { 
        type: String,
        required: [
            true,
            "firstname must be given!"
        ]
    },
    lastname: { 
        type: String,
        required: [
            true,
            "Lastname must be given!"
        ]
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
    email: {
        type: String,
        validate: {
            validator: v => {
                Promise.resolve(
                    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
                );
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [
            true,
            "An email is required!"
        ]
    },
    password: {
        type: String,
        Required: [
            true,
            "A password is required to sign up!"
        ]
    },
    restaurants: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Restaurant" 
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

const Owner = mongoose.model("Owner", ownerModel);
module.exports = Owner;