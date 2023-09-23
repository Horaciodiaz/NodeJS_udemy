const { SalesService } = require('./services');
const debug = require('debug')('app:module-products-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');

module.exports.SalesController = {
    getSales: async (request, response) => {
        try {
            let sales = await SalesService.getAll();
            Response.success(response, 200, 'Lista de Ventas', sales);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    getSale: async (request, response) => {
        try {
            const { params: { id } } = request;
            let sale = await SalesService.getById( id );
            if (!sale) {
                Response.error(response, new createError.NotFound());
            }else Response.success(response, 200,  `Venta ${id}`, sale);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    createSale: async (request, response) => {
        try {
            const { body } = request;
            if (!body || Object.keys(body).length === 0) {
                Response.error(response, new createError.BadRequest());
            }else{
                const insertedId = await SalesService.createSale(body);
                if(insertedId) Response.success(response, 201, "Venta agregada", insertedId);
                else Response.error(response, new createError.BadRequest());
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    deleteSale: async (request, response) => {
        try {
            const { params: { id } } = request;
            const saleDelete = await SalesService.deleteSale(id);
            if (!saleDelete) {
                Response.error(response, new createError.NotFound());
            } else {
                Response.success(response, 200, "Venta eliminada", saleDelete);
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    }
};