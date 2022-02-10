const {DataTypes} = require("sequelize");
const db = require("../db");

const DrinkNote = db.define("drinkNote", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
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
 