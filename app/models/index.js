const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    storage: 'contacts',
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

/*const sequelize = new Sequelize(dbConfig.dialect + '://' + dbConfig.USER + ":" + dbConfig.PASSWORD + "@" + dbConfig.HOST + ":" + dbConfig.PORT + "/" + dbConfig.DB);*/
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
module.exports = db;