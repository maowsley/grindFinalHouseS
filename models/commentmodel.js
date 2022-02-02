const {DataTypes} = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
    reply: {
        type: DataTypes.STRING,
        allowNull: false
    },

    customer: {
        type: DataTypes.INTEGER,
    },
})

module.exports = Comment;