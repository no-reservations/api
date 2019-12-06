const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerModel = new Schema({

});

const Owner = mongoose.model("Owner", ownerModel);
module.exports = Owner;