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
      diet: UserProfile.diet,
    }).then(function (data) {
      resolve(data);
    })
      .catch(function (err) {
        reject("unable to create User");
      })
  });
};