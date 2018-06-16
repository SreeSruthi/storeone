
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
MongoClient.connect(url, function (err, db) {
     if(err) throw err;
     var dbo = db.db("mydb");
     var myobj={name: "Peer Consulting Resources Inc", address: "20 jefferson plaza"};
     dbo.createCollection("friends").insertOne(myobj, function(err, res) {
    	    if (err) throw err;
    	    console.log("one document inserted!");
    	    
    	//======================================================================================== 
    	    //......................................................................................
     //console.log("--------------------" + dbo)*/
     //var myobj = 
    	    //{ name: 'Sree', address: 'Hemlock Street 16'};
     
     //db.createCollection("folks").insertOne(myobj, function(err, res) {
    	    //if (err) throw err;
    	    //console.log("Number of documents inserted : " + res.insertedCount);
    	    db.close();
     });
     
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('jshtml', require('ejs').renderFile);
app.set('view engine', 'jshtml');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
