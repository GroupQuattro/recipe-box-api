const Sequelize = require('sequelize');
const mysql = require('mysql');

//Code to connect to phpMyAdmin
connectDatabase = function () {
  const connection = mysql.createConnection({
    host: 'mymysql.senecacollege.ca',
    user: 'prj666_201a04',
    password: 'faGX@7748',
    database: 'prj666_201a04'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
}

// Code for connecting to database via sequelize
var sequelize = new Sequelize('prj666_201a04', 'prj666_201a04', 'faGX@7748', {
  host: 'mymysql.senecacollege.ca',
  dialect: 'mysql'
});

var UserProfile = sequelize.define('UserProfile', {
  userProfileId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  lastName: Sequelize.STRING,
  firstName: Sequelize.STRING,
  diet: Sequelize.STRING
});

module.exports.initialize = function () {
  connectDatabase();
  return new Promise(function (resolve, reject) {
    sequelize.sync().then(function (UserProfile) {
      console.log('Connection has been established with User database!!');
      resolve();
    }).catch(function (err) {
      reject("unable to sync the database");
    });
  });
};

