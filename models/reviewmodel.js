const { DataTypes } = require("sequelize");
const db = require("../db");

const Review = db.define("review", { 
    
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        //defaultValue: DataTypes.UUIDV4
    },

    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    user_username: {
        type: DataTypes.STRING
    },
    
    title: {
        type: DataTypes.STRING,
        required: true
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: DataTypes.DATE, 
    }, {
    underscord: true
    }
);

module.exports = Review;