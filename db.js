"use strict";

const mongoose = require("mongoose");

const database_name = process.env.DB_NAME;
const database_uri = process.env.DB_URI || `mongodb://localhost`;
const database_url = `${database_uri}/${database_name}`;

mongoose.connect(database_url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;