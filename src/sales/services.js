const { ObjectId } = require('mongodb');

const { Database } = require('../database');
const { ProductsService } = require('../products/services');
const { UsersService } = require('../users/services');

const debug = require('debug')('app:module-sales-service');

const COLLECTION = 'sales';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();//.find dentro de una coleccion es algo de mongodb D:
}
const getById= async (id) => {//las promesas se resuelven dentro de el controlador :D
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id);
    return await collection.findOne({_id: objectId});
}
const createSale = async (sale) => {
    let user = await UsersService.getById(sale["userId"]);
    if (user) {
        let productsPromises = sale["products"].map( async (saleProduct) => {
            let product = await ProductsService.getById(saleProduct.productId);
            if(product && product.cantidad >= saleProduct.cantidad){
                product.cantidad -= saleProduct.cantidad;
                return product;
            }else{
                return null;
            }
        });
        const products = await Promise.all(productsPromises);
        if(!products.includes(null)) {
            products.map( async (product) => {
            const id = product._id.toString();
            debug(id);
            await ProductsService.updateProduct(
                id,
                Object.fromEntries(Object.entries(product).slice(1))//solo los datos del producto sin el id
            )});
            const collection = await Database(COLLECTION);
            let result = await collection.insertOne(sale);
            return result.insertedId;
        }
        else return null;
    } else {
        return null;
    }
}
//delete
const deleteSale = async (id) => {//este delete no repone el stock de el producto que se compró
    const collection = await Database(COLLECTION);
    const sale = await getById(id);
    if(sale){
        await collection.deleteOne({ _id: new ObjectId(id) });
        return sale;
    }else return null;
}

module.exports.SalesService = {
    getAll,
    getById,
    createSale,
    deleteSale
}