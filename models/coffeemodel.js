const {DataTypes} = require("sequelize");
const db = require("../db");


const Coffee = db.define ("search", {
   /* id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.INTEGER,
        allowNull: false
    }, */

    coffee_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    coffee_image: {
        type: DataTypes.BLOB('medium'),
        allowNull:false
    }
});

module.exports = Coffee;