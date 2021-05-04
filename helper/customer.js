// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const CustSchema = new Schema({
    creation_date : {
      type : Date,
      required : true,
      default : Date.now
    } ,
    customer_name :{
      type :  String,
      required : true
    } ,
	ticket_price :{
        type : Number,
        required : true
    } 
    
});

const Customer = mongoose.model('Customer',CustSchema);

module.exports = Customer;
