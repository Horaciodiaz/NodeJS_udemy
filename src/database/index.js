const { MongoClient } = require("mongodb");
const debug = require("debug")("app:module-database");

const { Config } = require('../config/index');

var conection = null;
//el mongodriver funciona de manera asincrona por eso lo resolvemos mediante promesas :D
module.exports.Database = (collection) => new Promise( async (resolve, reject) => {
    try{
        if(!conection){
            const client = new MongoClient(Config.mongoUri);
            conection = await client.connect();
            debug('Conectando con la base de datos');
        }
        debug('Utilizando la conexion ya establecida');
        const db = conection.db(Config.mongoDbName);
        resolve(db.collection(collection));
    }catch(error){
        reject(error);
    }
});
