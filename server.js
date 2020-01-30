var express = require("express");
var app = express();
var  path = require("path");
const admin = require('firebase-admin');
const apiSecret = require('./config/apiKey.json');
const routes = require("./src/routing/routes.js");
var recipeRouter = require('./src/routing/recipe');
//const admin = require('./src/firebase-admin/admin');
var cookieParser = require('cookie-parser');
var HTTP_PORT = process.env.PORT || 8082;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
   process.env.secret= apiSecret.key;
}

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/src/index.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
 res.send({'Page': 'About'});
});

app.use('/recipe',recipeRouter);

app.get("/recipe/:recipeId", function(req,res){
res.send(req.params);

});

function authenticate(){
  
}
function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then(() => {
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}
app.use('/auth',checkAuth);
app.get('/auth', (req, res) => {
  res.json({
    message: 'Authenticated!'
  })
})
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);