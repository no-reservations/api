const express = require("express");
const bodyParser = require('body-parser');
const logger = require("morgan");
const routes = require("./routes");
const db = require("./db");

const app = express();


const DEBUG = process.env.DEBUG || true;
const port = process.env.PORT || 8080;

// Initialize body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Initialize logger
const log_level = DEBUG ? "combined" : "dev";
app.use(logger(log_level));

// Initialize routes
routes(app);


  
let server = app.listen(port, function () {

    let host = server.address().address
    let port = server.address().port

    console.log('app listening at http://%s:%s', host, port)

});
