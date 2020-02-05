var express = require('express');
var router = express.Router();

var userProfileController = require('../controllers/userProfileController');

// Routes for recipes
router.get('/', function (req, res) {
  res.send({ "router": "user" });
});
router.get('/getAllUsers', userProfileController.getAllUsers);
router.get('/getUserById/:id', userProfileController.getUserProfileById);

module.exports = router;


/*
var express = require('express');
var router = express.Router();

var recipeController = require('../controllers/recipeController');

// Routes for recipes
router.get('/', function(req,res){
    res.send({"router": "recipe"});
});
router.get('/detail/:id',recipeController.recipeDetail);
router.get('/search?*',recipeController.getRecipes);

module.exports = router;
*/