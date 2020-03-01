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
// VM Options
const vmHostname = '10.102.112.128';
const vmPort = 10034;
/*************DO NOT TOUCH ************************************ */
app.use(express.static(__dirname));
// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function (req, res) {
  console.log('PATH: ', path);
  res.sendFile(path.join(__dirname, "src/home.html"));
});



app.get('/android', function (req, res) {
  var filePath = '../appBuilds/android/recipeBox.apk'; // Or format the path using the `id` rest param
  var fileName = "recipeBox.apk"; // The default name the browser will use
  try {
    res.download(filePath, fileName);
  } catch (err) {
    res.send('File Not Found. Android app build is not available');
  }
});

app.get('/ios', function (req, res) {
  var filePath = '../appBuilds/ios/recipeBox.ipa'; // Or format the path using the `id` rest param
  var fileName = "recipeBox.ipa"; // The default name the browser will use
  try {
    res.download(filePath, fileName);
  } catch (err) {
    res.send('File Not Found. iOS app builds are not available yet');
  }
});
/*****************************************************************/
app.get("/rest-api", function (req, res) {
  res.sendFile(path.join(__dirname, "/src/index.html"));
});

app.get("/docs", function (req, res) {
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
    app.listen(HTTP_PORT, app.listen);
  }).catch((err) => {
    console.log("Not able to connect to the server");
  });
/*
onHttpStart = () => {
  console.log("Express http server listening on: " + HTTP_PORT);
}
*/
app.listen(vmPort, vmHostname, () => {
  console.log('Server is running at http://' + vmHostname + ':' + vmPort + '/');
});