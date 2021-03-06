"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const logger = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const db = require("./db");

const app = express();

const PORT = require("./config").PORT;
const DEBUG = require("./config").DEBUG;

// Initialize body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));  

// Initialize logger
const log_level = DEBUG ? "combined" : "dev";
app.use(logger(log_level));

// TODO: Specify stricter cors mode in dev environment
DEBUG && 
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

// Initialize routes
routes(app);

const app_server = app.listen(PORT, () => {
    const {
        family,
        address, 
        port 
    } = app_server.address();

    DEBUG && console.log(
        `app listening via ${family} at http://${address}:${port}`,
    );
});

// app.listen(PORT);

// Export app for testing
module.exports = app;