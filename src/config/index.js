//configuracion de variables de entorno
const dontenv = require('dotenv')
dontenv.config();

module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DBNAME
}