/* Debe permitir hacer ventas de productos existentes,
por cada venta el registro de que usuario realizo la compra,
 */
const express = require('express');

const { SalesController } = require('./controller');

const router = express.Router();

module.exports.SalesAPI = (app) => {
    router
        .get('/', SalesController.getSales)//todas las ventas
        .get('/:id', SalesController.getSale)//venta por id
        .post('/', SalesController.createSale)//crear venta
        .delete('/:id', SalesController.deleteSale);//borrar venta

    app.use('/api/sales', router)// se concatena con los path del router :D
}