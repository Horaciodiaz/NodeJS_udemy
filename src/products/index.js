const express = require('express');

const { ProductsController } = require('./controller');

const router = express.Router();

module.exports.ProductsAPI = (app)=>{
    router
        .get('/', ProductsController.getProducts)//https://localhost:3000/api/products/
        .get('/report', ProductsController.generateReport)
        .get('/:id', ProductsController.getProduct)//https://localhost:3000/api/products/12
        .post('/', ProductsController.createProduct)
        .put('/:id', ProductsController.updateProduct)
        .delete('/:id', ProductsController.deleteProduct);

    app.use('/api/products', router)// se concatena con los path del router :D
}