
const db = require('../db');

const PremiumUserModel = require("./premiumusermodel");

const DrinkNoteModel = require("./drinknotemodel");

const ReviewModel = require("./reviewmodel");

const CommentModel = require("./commentmodel");


//associations

 PremiumUserModel.hasMany(ReviewModel);
PremiumUserModel.hasMany(CommentModel);
PremiumUserModel.hasMany(DrinkNoteModel);




ReviewModel.belongsTo(PremiumUserModel);
ReviewModel.hasMany(CommentModel);


CommentModel.belongsTo(ReviewModel);


module.exports = {
    //dbConnection: db,
    //models: {
    PremiumUserModel,
    DrinkNoteModel,
    ReviewModel,
    CommentModel
    //}
};