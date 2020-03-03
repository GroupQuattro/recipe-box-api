//var Recipe = require('../models/Recipe');
// Display list of all Authors.
var axios = require('axios');
const urlBase = "https://api.spoonacular.com/recipes/"
const apiKey = process.env.secret;

var rr = require('../routing/routes')
//const recipeModel = require("../models/UserRecipes");
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
/* Important steps to connect to db instance and update it */

var db = new Sequelize('prj666_201a04', 'prj666_201a04', 'faGX@7748', {
  host: 'mymysql.senecacollege.ca',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});
const resultLimit = 20; // limit of spoonacular api results; 
var UserRecipes = db.import('../models/UserRecipes.js');
var IngredientsCategory = db.import('../models/IngredientsCategory.js');

/* Gets a list of recipes matching criteria
format to come from APP : http://localhost:8082/recipe/search?id=123&cuisine=italian&title=pizza
*/
exports.getRecipes = async function (req, res) {
  console.log('KEY %%%% : ')
  console.log(apiKey);
  var flag = false;
  var response = ""
  var query = "";
  var dbQuery = {};
  console.log(req.query);
  for (var key in req.query) {
    if (key == "user") {
      flag = true;
      continue;
    }
    if (query) {
      query = query + "&" + key + "=" + req.query[key];


    }
    else
      query = query + key + "=" + req.query[key];

    dbQuery[key] =
      {
        [Op.like]: '%' + (req.query[key]) + '%'
      }
  }

  console.log('DB ======= ');
  console.log(dbQuery.key);
  if (!flag) {
    var reqURL = urlBase + 'complexSearch?apiKey=' + process.env.secret + '&number=' + resultLimit + '&' + query;
    try {
      response = await axios.get(reqURL);

    } catch (error) {
      console.error(error);
    }
    console.log('API RESULTS ========');
    console.log(response.data.results);
    res.send(response.data);
  }
  else if (flag) {
    try {
      const { count, rows } = await UserRecipes.findAndCountAll(
        {
          where: dbQuery,
          raw: true
        }

      );
      console.log("NUM RESULTS:: " + count);
      response = response + "[";
      for (let i = 1; i <= count; i++) {
        var d = JSON.stringify(rows[i - 1]);
        console.log("DATA ::::::::::: ");
        console.log(d);
        response = response + d;
        if (i == count) {
          response = response + ']'
        }
        else {
          response = response + ','
        }
      }

      // response = count + rows;
      console.log(response);
    } catch (err) {
      console.log(err.lineNumber);
      console.log(err);
    }

    res.send(response);
  }
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
  const data = req.body;
  /*
    IngredientsCategory.create(data).then(() => {
      res.send('DONE')
    }).catch((err) => {
      res.send(err);
      console.log(err);
    });
  */

  UserRecipes.create({
    uid: 'U007', userId: "800", recipeRating: 1, recipeTitle: "Salad Recipe",
    ingredients: "Mango", specialInstructions: "None", customDetails: "None"
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