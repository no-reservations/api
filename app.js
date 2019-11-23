const express = require("express");
const logger = require("morgan");
const routes = require("./routes");

const app = express();

const DEBUG = process.env.DEBUG || true;

// Initialize logger
const log_level = DEBUG ? "combined" : "dev";
app.use(logger(log_level));

// Initialize routes
routes(app);


  
let server = app.listen(3000, function () {

    let host = server.address().address
    let port = server.address().port

    console.log('app listening at http://%s:%s', host, port)

});