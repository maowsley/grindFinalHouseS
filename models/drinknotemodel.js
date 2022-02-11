const {DataTypes} = require("sequelize");
const db = require("../db");

const DrinkNote = db.define("drinkNote", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    user_id: {
        type: DataTypes.UUID,
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
        values: ["hot", "cold"]
    },

    content: {
        type: DataTypes.STRING,
        allowNull: true
     },

    drinkSize: {
        type: DataTypes.ENUM,
        values: ["small", "medium", "large"]
    }

});

module.exports = DrinkNote;
 