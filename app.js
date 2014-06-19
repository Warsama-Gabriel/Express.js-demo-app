
var express = require('express');
var app = express();
var path = require('path'); //specifying the right path for out views

app.set('views', path.join(__dirname, 'views')); //setting up path structure
app.set('view engine', 'ejs');


app.get('/', function(request, response){
  response.render("index"); //
});

app.listen(3000); //go to port 3000 and listen
