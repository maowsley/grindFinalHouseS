const {DataTypes} = require("sequelize");
const db = require("../db");

const User= db.define("user", {


    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false
    },
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
        values: ["user", "admin", "diasabled"],
    },
});
        
   
module.exports = User