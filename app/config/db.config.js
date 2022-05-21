module.exports = {
    HOST: "localhost",
    PORT: 8080,
    USER: "root",
    PASSWORD: "password",
    DB: "contactdb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};