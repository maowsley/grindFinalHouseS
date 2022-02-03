const {DataTypes} = require("sequelize");
const db = require("../db");

const premiumUser = db.define("premiumUser", {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
});

module.exports = premiumUser;