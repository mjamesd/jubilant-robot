/*
 * Your .env file should look like this:
    ```
    # MODE accepts two options: "development" or "production". If the former, it will use the local database and localhost.
    MODE= ?
    VERSION= ?.?

    DB_NAME= ?
    DB_USER= ?
    DB_PASS= ?
    DB_CONN= ?


    TEST_URL=http://localhost
    PROD_URL= ?
    ```
*/

require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.MODE === "production") {
    sequelize = new Sequelize(
        process.env.PROD_DB_NAME,
        process.env.PROD_DB_USER,
        process.env.PROD_DB_PASS,
        {
            host: process.env.PROD_DB_HOST,
            dialect: 'mysql',
            port: 3306
        }
    );
} else if (process.env.MODE === "development") {
    sequelize = new Sequelize(
        process.env.TEST_DB_NAME,
        process.env.TEST_DB_USER,
        process.env.TEST_DB_PASS,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
} else {
    console.log(`Error: "MODE" environment variable not set correctly.`);
}

module.exports = sequelize;