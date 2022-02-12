const {DataTypes, Sequelize} = require("sequelize");
const db = require("../db");

const DrinkNote = db.define("drinkNote", {
    /*id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }, */

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    user_username: {
        type: DataTypes.STRING
    },

    drinkName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    drinkTemp: {
        type: DataTypes.ENUM,
        values: ["hot", "cold"],
        allowNull: false
    },

    content: {
        type: DataTypes.STRING,
        allowNull: true
     },

     
    size: {
        type: DataTypes.ENUM,
        values: ["small", "medium", "large"], 
        allowNull: false
     }
});

module.exports = DrinkNote;
 