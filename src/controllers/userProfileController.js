var Sequelize = ('sequelize')

var UserProfile = sequelize.define('UserProfile', {
  userProfileId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  lastName: Sequelize.STRING,
  firstName: Sequelize.STRING,
  diet: Sequelize.STRING
});

module.exports.addUser = (userData) => {

  return new Promise(function (resolve, reject) {

    for (var foo in userData) {
      if (userData[foo] == "") {
        userData[foo] = null;
      }
    }
    UserProfile.create({
      lastName: UserProfile.lastName,
      firstName: UserProfile.firstName,
      diet: UserProfile.diet
    }).then(function (data) {
      resolve(data);
    })
      .catch(function (err) {
        reject("Error! Unable to create User");
      })
  });
};

module.exports.updateUser = (userData) => {

  return new Promise(function (resolve, reject) {

    for (var bar in userData) {
      if (userData[bar] == "") {
        userData[bar] = null;
      }
    }

    UserProfile.update({
      lastName: UserProfile.lastName,
      firstName: UserProfile.firstName,
      diet: UserProfile.diet
    },
      {
        where: { userProfileId: userData.userProfileId }
      }).then(function (data) {
        resolve(data);
      })
      .catch((err) => {
        reject("Error! Unable to update User");
      });
  });
};

module.exports.deleteUserById = function (userId) {

  return new Promise(function (resolve, reject) {

    UserProfile.destroy({
      where: { userProfileId: userId }
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject("Error! User was not deleted");
      })
  })
}

module.exports.getUserProfileById = (userId) => {

  return new Promise((resolve, reject) => {

    UserProfile.findAll({
      where: { userProfileId: userId }
    })
      .then((data) => {
        resolve(data[0]);
      })
      .catch(() => {
        reject("Error! No User returned for this profileId");
      })

  });
};

module.exports.getAllUsers = () => {

  return new Promise(function (resolve, reject) {
    UserProfile.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("Error! No User returned");
      });
  });
};