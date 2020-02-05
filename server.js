var express = require("express");
var app = express();
var path = require("path");
const admin = require('firebase-admin');
const apiSecret = require('./config/apiKey.json');
const routes = require("./src/routing/routes.js");
const checkUser = require("./src/routing/authentication");
var recipeRouter = require('./src/routing/recipe');
//const admin = require('./src/firebase-admin/admin');
const dataService = require('./src/routing/routes');

var cookieParser = require('cookie-parser');
var HTTP_PORT = process.env.PORT || 8082;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
  process.env.secret = apiSecret.key;
}

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/index.html"));
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
  res.send({ 'Page': 'About' });
});

app.use('/recipe', recipeRouter);

app.get("/recipe/:recipeId", function (req, res) {
  res.send(req.params);

});
app.get("/authenticate/:id", verifyUser, function (req, res) {
  res.json({
    message: 'Authenticated!'
  })
});
app.get("/updateUserQuestion?", verifyUser, function (req, res) {
  res.json({
    message: 'Authenticated!'
  })
});

function verifyUser(req, res, next) {
  var idToken = req.query.id;
  console.log('VERIFYING ******* ');
  admin.auth().verifyIdToken(idToken)
    .then(function (decodedToken) {
      let uid = decodedToken.uid;

    }).catch(function (error) {

    });
}

app.use(function (req, res) {
  res.status(404).send("Page Not Found.");
});


dataService.initialize()
  .then(() => {
    app.listen(HTTP_PORT, onHttpStart);
  }).catch((err) => {
    console.log("Not able to connect to the server");
  });

onHttpStart = () => {
  console.log("Express http server listening on: " + HTTP_PORT);
}