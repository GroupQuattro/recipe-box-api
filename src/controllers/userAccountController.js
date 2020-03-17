var axios = require('axios');
const apiKey = process.env.secret;
const keys = require('../../config/apiKey.json')

const { Sequelize, Model, DataTypes, Op } = require("sequelize");
/* Important steps to connect to db instance and update it */

var db = new Sequelize('prj666_201a04', keys.dbUsername, keys.dbPass, {
  host: 'mymysql.senecacollege.ca',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

var UserAccount = db.import('../models/UserAccount.js');

exports.userAccountCreatePOST = function (req, res) {
  res.type('application/json')
  console.log('CREATING USER \n');
  const data = req.body;
  // var user = JSON.parse(data);
  //console.log(user.email);
  // console.log(req.body.email);
  UserAccount.create(req.body).then(() => {
    res.send('DONE')
  }).catch((err) => {
    res.send(err);
    console.log(err);

    console.log('Created');
  });

};
exports.getUserAccountById = async function (req, res) {
  console.log('Getting User By UID');
  console.log(req.body.id);
  try {
    const row = await UserAccount.findOne(
      {
        where: req.body,
        raw: true
      }

    );
    console.log("RESULT:: " + JSON.stringify(row));
    res.send(JSON.stringify(row));
  } catch (err) {
    console.log(err);
    res.send('Error' + err);
  }
};