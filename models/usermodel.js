const {DataTypes} = require("sequelize");
const db = require("../db");

const User= db.define("user", {


    /*id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.INTEGER,
        allowNull: false */
    
    username: {
        type: DataTypes.STRING(100),
        required: true,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        
    },
    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        defaultValue: "user",
    },
});
        
   
module.exports = User