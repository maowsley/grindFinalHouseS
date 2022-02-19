
//const db = require('../config');

const UserModel = require("./usermodel");

const DrinkNoteModel = require("./drinknotemodel");

const ReviewModel = require("./reviewmodel");



//associations




ReviewModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy'
    }
});

UserModel.hasMany(ReviewModel);

UserModel.hasMany(DrinkNoteModel);
DrinkNoteModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'createdBy'
    }
});




module.exports = {
    //dbConnection: db,
    models: {
    UserModel,
    DrinkNoteModel,
    ReviewModel,

    }

//hasOne, belongsTo, hasMany, belongsToMany

//one-to-one =>  hasOne, belongsTo 

};
