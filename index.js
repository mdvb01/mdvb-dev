'use strict';

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://localhost/mycustomers";
const DATABASE_NAME = "mycustomers";
var Customer = require('./helper/customer.js');

var port = process.env.PORT || 8080;
var app = Express();
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
var database, collection;
// START THE SERVER
// =============================================================================

app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL,{ useUnifiedTopology: true }, (error, client) => {
        if(error) {
            console.log("Error connecting db");
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("customers");
        console.log("Connected to DB-`" + DATABASE_NAME + "`!");
    });
});



//To Post the data in the DB
app.post("/customers", (request, response) => {
    collection.insertOne({
            "creation_date": request.body.creation_date,
            "customer_name": request.body.customer_name,
            "ticket_price": request.body.ticket_price
    }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

//to get all the data available in DB
app.get("/customers", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }

        response.send(result);
    });
});

// to get the data by ID
app.get('/customers/:customer_id', (req, res) => {
	let id = req.params.customer_id;
    Customer.findOne(id,(err, customer) => {
		if (err){
			res.send(err)
        }
		res.send(customer);
	});
 
});

//To update the data in DB
app.put('/customers/:customer_id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.customer_id;
	var data = req.body;
    var modify = "update";
 console.log("type of data" , typeof data)
	// save the user
	collection.findOneAndUpdate({id},data,modify).then(function(customer){
        console.log("Customer", customer);
        Customer.findOne({id}).then(function(customer){
            res.send(customer); 

	});
});
});
