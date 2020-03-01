/* jshint indent: 2 */
const { Sequelize, Model, DataTypes } = require("sequelize");
const UserRecipes = function (sequelize, DataTypes) {
  return sequelize.define('userRecipes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    uid: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'uid'
    },
    userId: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'userId'
    },
    recipeTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'recipeTitle'
    },
    recipeDesc: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      field: 'recipeDesc'
    },
    recipeImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'recipeImage'
    },
    recipeRating: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'recipeRating'
    },
    mealType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'mealType'
    },
    dietRestrictions: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'dietRestrictions'
    },
    ingredients: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'ingredients'
    },
    cuisine: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'cuisine'
    },
    recipeSource: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'recipeSource'
    },
    nutrients: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'nutrients'
    },
    recipeVisibility: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'private',
      field: 'recipeVisibility'
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'creationDate'
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updateDate'
    },
    specialInstructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'specialInstructions'
    },
    customDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Not Available',
      field: 'customDetails'
    }
  }, {
      tableName: 'UserRecipes'
    });
};
(async () => {
  await sequelize.sync({ force: true });
  const x = UserRecipes;
})();

module.exports = UserRecipes;