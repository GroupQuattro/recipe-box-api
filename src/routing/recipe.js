var express = require('express');
var router = express.Router();

var recipeController = require('../controllers/recipeController');

// Routes for recipes
router.get('/', function (req, res) {
  res.send({ "router": "recipe" });
});
router.get('/detail/:id', recipeController.recipeDetail); // request a recipe detail by ID
router.get('/search?*', recipeController.getRecipes); // search for recipes
router.get('/create', recipeController.recipeCreatePOST); // POST Create Recipe
module.exports = router;