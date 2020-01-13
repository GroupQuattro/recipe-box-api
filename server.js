var express = require("express");
var app = express();
var  path = require("path");
//const admin = require('firebase-admin');
//const admin = require('./src/firebase-admin/admin');
var cookieParser = require('cookie-parser');
var HTTP_PORT = process.env.PORT || 8082;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/src/index.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/index.html"));
});

function authenticate(){
  
}

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);