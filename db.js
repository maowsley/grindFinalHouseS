const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:'postgres',
    protocol: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production',
    dialectOptions:{
        ssl: "true",
        native: true
            
        },
    },
);
    

module.exports = sequelize;