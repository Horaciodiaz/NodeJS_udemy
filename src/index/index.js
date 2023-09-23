const express = require('express');
const createError = require('http-errors');
const { Response } = require('../common/response');

module.exports.IndexAPI = (app) => {
    const router = express.Router();
    
    router.get('/', (request, response) => {
        const menu = {
            products: `https://${request.headers.host}/api/products`,
            users: `https://${request.headers.host}/api/users`,
            sales: `https://${request.headers.host}/api/sales`,
        }
        Response.success(response, 200, "Inventario API", menu);
    })

    app.use('/',router);
}

module.exports.NotFoundAPI = (app) => {
    const router = express.Router();

    router.all("*", (request, response) => {
        Response.error(response, new createError.NotFound());
    })
    app.use('/',router);
}