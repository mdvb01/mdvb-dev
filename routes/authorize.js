
'use strict';

const router = require("express");
const app = router();
const jwt = require("jsonwebtoken");
// Import Model
const Customer = require("../helper/customer");
const verify = require('./verifyToken')

const custModel = require('../helper/customer');



//to login
app.get('/login', async(request,response)=>{
    const user = "mongotest";
    console.log("setting the password");
    const token = jwt.sign({user}, process.env.TOKEN);
    response.header('auth-token',token).send(token);
});

// to add the data
app.post('/customer',verify, async(req,res) => {
    console.log('Adding the data');
    const customer = new Customer({
            "creation_date": req.body.creation_date,
            "customer_name": req.body.customer_name,
            "ticket_price": req.body.ticket_price
});
try{
    const savedCustomer = await customer.save();
    res.send("Success");
}
catch(err){
    res.status(400).send(err)
}
});

// to get the data   
app.get('/customer',verify, async(request,response)=>{
 console.log("Getting all data");
 try{
     const allCust = await Customer.find({});
     console.log("Data received")
     response.send("Success");
 }
 catch(error){
     response.send("error while getting data")
 }
});
 
// to update the data for the given id
app.put("/customer/:id",verify, async (request, response) => {
    console.log("Updating customer with id")
    try {
        var cust = await Customer.findById(request.params.id).exec();
        cust.set(request.body);
        var result = await cust.save();
        response.send("Success");
    } catch (error) {
        response.status(500).send(error);
    }
});

// to delete the data from DB
app.delete("/customer/:id",verify, async (request, response) => {
    try {
        console.log("Deleting the data");
        var result = await Customer.deleteOne({ _id: request.params.id }).exec();
        response.send("Success");
    } catch (error) {
        response.status(500).send(error);
    }
});



module.exports = app;
