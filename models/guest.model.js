const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestModel = new Schema({
    name: { type: String, required: [true, "Guest name is required!"] },
    // Add validator for phone number.
    // Note: This fails for int'l stuff
    // See: https://mongoosejs.com/docs/validation.html#custom-validators
    phone: {
        type: String,
        validate: {
            validator: v => {
                Promise.resolve(/\d{3}-\d{3}-\d{4}/.test(v));
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const Guest = mongoose.model("Guest", guestModel);
module.exports = Guest;