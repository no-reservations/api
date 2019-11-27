const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationModel = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    Guest: { type: String, required: true},
    size: { typd: Number, required: true, min: 0 },
});

const Reservation = mongoose.model("Reservation", reservationModel);
module.exports = Reservation;