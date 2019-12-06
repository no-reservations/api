"use strict";

const mongoose = require("mongoose");

const database_url = process.env.DB_URL || `mongodb://localhost/test`;
mongoose.connect(database_url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;