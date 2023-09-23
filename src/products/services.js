const { ObjectId } = require('mongodb');

const { Database } = require('../database');

const { ProductsUtils } = require('./utils');

const COLLECTION = 'products';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();//.find dentro de una coleccion es algo de mongodb D:
}

const getById= async (id) => {//las promesas se resuelven dentro de el controlador :D
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id);
    return await collection.findOne({_id: objectId});
}

const createProduct = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const generateReport = async (name, response) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, response);
}
//update
const updateProduct = async (id, product) => {
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id);
    await collection.updateOne(
        { _id: objectId },
        {
            $set: { ...product }
        }
        );
    return await getById(id);
}
//delete
const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    const product = await getById(id);
    if(product){
        await collection.deleteOne({ _id: new ObjectId(id) });
        return product;
    }else return null;
}

module.exports.ProductsService = {
    getAll,
    getById,
    createProduct,
    generateReport,
    updateProduct,
    deleteProduct
}