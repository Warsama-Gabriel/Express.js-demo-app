
var express = require('express');
var app = express();
var path = require('path'); //specifying the right path for out views
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/express_lecture'); //connecting our database to our app
var bodyParser = require('body-parser'); //handling http requests and params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



app.set('views', path.join(__dirname, 'views')); //setting up path structure
app.set('view engine', 'ejs');

app.use(function(req,res,next){   //inserting our database into every route
    req.db = db; //defining our request
    next();
});


var rusty = {"name": "Rusty", "breed": "husky"};

var friends = ["Luke", "Francisco", "Sarah", "Cody", "Travis"]

app.get('/', function(request, response){
  response.render("index", {people: friends}); //passing object 'people' to the views
});

app.get('/dogs', function(req, res){
  var db = req.db;
  var collection = db.get('dogcollection');
  collection.find({},{}, function(e, docs){  //getting all the dogs from our database
    res.render("dogs", {
      "dogs": docs
    });
  });
});

app.listen(3000); //go to port 3000 and listen
