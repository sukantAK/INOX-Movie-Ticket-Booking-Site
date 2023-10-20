var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/sign_up', function(req,res){
    var Name = req.body.name;
    var Number = req.body.num;
    var Email =req.body.email; 
    var Password =req.body.pwd;
    var data = {
        "name": Name,
        "num":Number,
        "email":Email,
        "pwd":Password,
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
})
app.listen(8000);
console.log("server listening at port 3000");