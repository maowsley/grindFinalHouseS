const {DataTypes} = require("sequelize");
const db = require("../db");

const DrinkNote = db.define("drinkNote", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
 