const express = require('express');
const router = express.Router();
let config=require('./config');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

// declare axios for making http requests
const axios = require('axios');
var db;
MongoClient.connect(`mongodb+srv:${config.username}:${config.password}//@cluster0-h4wip.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true,
useUnifiedTopology: true }, (err, database) => {
if (err) return console.log(err);
db = database.db('testone');
});

router.route('/authuser').post(function(req, res2) {
    var email = req.body.email;
    var password = req.body.password;
    db.collection('users').findOne({"email": email}, { password: 1, role: 1,
    _id: 0 }, function(err, result) {
    if (result == null) res2.send([{"auth": false}]);
    else{
    bcrypt.compare(password, result.password, function(err, res) {
    if(err || res == false) {
    res2.send([{"auth": false}]);
    } else {
    res2.send([{"auth": true, "role": result.role}]);
    }
    });
    }
  });
});
    
router.route('/reguser').post(function(req, res) {
    var username = req.body.username;
    var firstname= req.body.firstname;
    var lastname=req.body.lastname;
    var email=req.body.email;
    var password = req.body.password;
    var address= req.body.address;
    var postacode=req.body.postacode;
    var handphone=req.body.handphone;
    var role=req.body.role;

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
    db.collection('users').insertOne({"name" : username,"firstname":firstname,
    "lastname":lastname,"email":email, "password" : hash,"address":address,"postacode":postacode,"handphone":handphone,"role":role}, (err, result) => {
    if (err) return console.log(err)
    console.log('user registered')
    res.send(result);
    });
    });
});

// insert new menu 
router.route('/insertmenu').post(function (req, res) {
    var menuname = req.body.menuname;
    var price=req.body.price;
    var description=req.body.description;
    var image=req.body.image;
        
    db.collection('menu').insertOne({"menuname":menuname,"price":price,"description":description,"image":image},(err, results) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.send(results);
  });
});
// get all posts
router.route('/posts').get(function(req, res) {
  db.collection('menu').find().toArray( (err, results) =>
 {res.send(results)});
 });

//  resturants



// Bookings



// 
    
module.exports = router;