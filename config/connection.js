require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.DB_CONN) {
    sequelize = new Sequelize(process.env.DB_CONN);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;