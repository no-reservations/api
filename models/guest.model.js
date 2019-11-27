const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestModel = new Schema({
});

const Guest = mongoose.model("Guest", guestModel);
module.exports = Guest;