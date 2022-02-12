
//const db = require('../config');

const UserModel = require("./usermodel");

const DrinkNoteModel = require("./drinknotemodel");

const ReviewModel = require("./reviewmodel");

const CommentModel = require("./commentmodel");

const CoffeeModel = require("./coffeemodel");


//associations

CommentModel.belongsTo(ReviewModel, {
    foreignKey: {
        name: 'postedBy'
    }
});

ReviewModel.hasMany(CommentModel);
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

CoffeeModel.hasMany(CoffeeModel, {as: "item"}, {
    foreignKey: {
        name: "item"
    }
});



module.exports = {
    //dbConnection: db,
    models: {
    UserModel,
    DrinkNoteModel,
    ReviewModel,
    CommentModel,
    CoffeeModel
    }
};

//hasOne, belongsTo, hasMany, belongsToMany

//one-to-one =>  hasOne, belongsTo 


