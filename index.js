'use strict';

const Express = require("express");
const app = Express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");

// Import dependency
var Customer = require('./helper/customer.js');
const authroute = require('./routes/authorize');

dotenv.config();

var port = process.env.PORT || 8080;

app.use(Express.json());

// START THE SERVER
// =============================================================================
//connect to DB
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true },() => 
    console.log("Connected to DB"));

//Connect to server
app.listen(port, () => 
    console.log("Server is up")
)


//Route the apis

app.use('/api', authroute);

