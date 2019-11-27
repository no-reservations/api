const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestModel = new Schema({
    name: { type: String, required: [true, "Guest name is required!"] },
    phone: { type: String },
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const Guest = mongoose.model("Guest", guestModel);
module.exports = Guest;