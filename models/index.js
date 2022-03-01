//const db = require('../config');

const UserModel = require("./usermodel");

const DrinkNoteModel = require("./drinknotemodel");

const ReviewModel = require("./reviewmodel");

//associations

ReviewModel.belongsTo(UserModel);

UserModel.hasMany(ReviewModel);

UserModel.hasMany(DrinkNoteModel);
DrinkNoteModel.belongsTo(UserModel);

module.exports = {
  //dbConnection: db,
  models: {
    UserModel,
    DrinkNoteModel,
    ReviewModel,
  },

  //hasOne, belongsTo, hasMany, belongsToMany

  //one-to-one =>  hasOne, belongsTo
};
