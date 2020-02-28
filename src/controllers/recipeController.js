//var Recipe = require('../models/Recipe');
// Display list of all Authors.
var axios = require('axios');
const urlBase = "https://api.spoonacular.com/recipes/"
const apiKey = process.env.secret;
var rr = require('../routing/routes')
//const recipeModel = require("../models/UserRecipes");
const { Sequelize, Model, DataTypes } = require("sequelize");
/* Important steps to connect to db instance and update it */

var db = new Sequelize('prj666_201a04', 'prj666_201a04', 'faGX@7748', {
  host: 'mymysql.senecacollege.ca',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

var UserRecipes = db.import('../models/UserRecipes.js');

/* Gets a list of recipes matching criteria
format to come from APP : http://localhost:8082/recipe/search?id=123&cuisine=italian&title=pizza
*/
exports.getRecipes = async function (req, res) {
  var response;
  var query = "";
  for (var key in req.query) {
    if (query)
      query = query + "&" + key + "=" + req.query[key];
    else
      query = query + key + "=" + req.query[key];
  }
  //console.log(query);
  var reqURL = urlBase + 'search?apiKey=' + process.env.secret + '&' + query;

  //console.log('Sending API Request to : '+reqURL);
  // res.send({"url":reqURL});
  try {
    response = await axios.get(reqURL);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  res.send(response.data);

}

// Display detail page for a specific Author.
exports.recipeDetail = async function (req, res) {
  var response;
  // console.log('Sending API Request to : '+ urlBase+req.params.id+'/information');
  try {
    response = await axios.get(urlBase + req.params.id + '/information?apiKey=' + process.env.secret);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  res.send(response.data);
  /*
 console.log('Sending API Request to : '+ urlBase+req.params.id+'/information');
 fetch(urlBase+req.params.id+'/information?apiKey='+apiKey)
 .then((response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    return response.json();
 })
 .then((data) => {
     var x = data;
 })
 .catch((error) => console.error(error));;
   res.send(x);
   */
};

// Display Author create form on GET.
exports.recipeCreateGET = function (req, res) {
  res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.recipeCreatePOST = function (req, res) {
  console.log('POSTING RECIPE \n');

  UserRecipes.create({
    id: 18, uid: 'U007', userId: "800", recipeTitle: "Another Recipe", recipeRating: 3, mealType: "Breakfast"
    , ingredients: "Porridge", recipeSource: "website", specialInstructions: "None", customDetails: "None"
  });
  console.log('Posted');


}

// Display Author delete form on GET.
exports.recipeDeleteGET = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.recipeDeletePOST = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.recipeUpdateGET = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.recipeUpdatePOST = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};