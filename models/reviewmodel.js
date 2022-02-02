const { DataTypes } = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    review: {
        type: DataTypes.STRING,
        allowNull: false
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    customer: {
        type: DataTypes.INTEGER
    }
});

module.exports = Review;