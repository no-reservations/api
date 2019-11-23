const express = require("express");
const routes = require("./routes");

const app = express();

routes(app);


  
let server = app.listen(3000, function () {

    let host = server.address().address
    let port = server.address().port

    console.log('app listening at http://%s:%s', host, port)

})