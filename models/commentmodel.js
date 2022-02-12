const {DataTypes} = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {

   /* id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.INTEGER,
        allowNull: false
    }, */
    comment_id: {
        type: DataTypes.UUID,
        allowNull:false,
    },

    content: {
        type: DataTypes.STRING,
        required: true
    },

    commenter_username: {
        type: DataTypes.STRING,
        required: true
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: DataTypes.DATE,
      }, {
      underscored: true
      }
);


module.exports = Comment;