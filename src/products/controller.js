const { ProductsService } = require('./services');
const debug = require('debug')('app:module-products-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');

module.exports.ProductsController = {
    getProducts: async (request, response) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(response, 200, 'Lista de productos', products);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    getProduct: async (request, response) => {
        try {
            const { params: { id } } = request;
            let product = await ProductsService.getById( id );
            if (!product) {
                Response.error(response, new createError.NotFound());
            }else Response.success(response, 200,  `Producto ${id}`, product);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    createProduct: async (request, response) => {
        try {
            const { body } = request;
            if (!body || Object.keys(body).length === 0) {
                Response.error(response, new createError.BadRequest());
            }else{
                const insertedId = await ProductsService.createProduct(body);
                Response.success(response, 201, "Producto agregado", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    generateReport: async (request, response) => {
        try {
            await ProductsService.generateReport('inventario', response);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    //update
    updateProduct: async (request, response) => {
        try {
            const { params: { id }, body } = request;
            if (!body || Object.keys(body).length === 0) {
                Response.error(response, new createError.BadRequest());
            }else {
                const update = await ProductsService.updateProduct(id, body);
                if (!update) {
                    Response.error(response, new createError.NotFound());
                } else {
                    Response.success(response, 200, "Producto actualizado", update);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    deleteProduct: async (request, response) => {
        try {
            const { params: { id } } = request;
            const productDelete = await ProductsService.deleteProduct(id);
            if (!productDelete) {
                Response.error(response, new createError.NotFound());
            } else {
                Response.success(response, 200, "Producto eliminado", productDelete);
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    }
};