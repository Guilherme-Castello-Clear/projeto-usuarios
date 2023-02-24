

const express = require('express'); //Include express lib
const consign = require('consign'); //Include consign lib
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

consign().include('routes').include('utils').into(app);// Include routes folder in let app and send app send to module.exports

app.listen(3000, "127.0.0.1", ()=>{//Start server

    console.log("Server running!");

});