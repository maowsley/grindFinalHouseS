const {DataTypes} = require("sequelize");
const db = require("../db");

const DrinkNote = db.define("drinkNote", {
    drinkName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    drinkTemp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,

    },

    customDrink: {
        type: DataTypes.STRING,
        allowNull: true
    },

    drinkSize: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    customer: {
        type: DataTypes.INTEGER
    }
});

module.exports = DrinkNote;
 