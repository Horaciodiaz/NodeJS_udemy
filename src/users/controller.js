const { UsersService } = require('./services');
const debug = require('debug')('app:module-users-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');

module.exports.UsersController = {
    getUsers: async (request, response) => {
        try {
            let users = await UsersService.getAll();
            Response.success(response, 200, 'Lista de usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    getUser: async (request, response) => {
        try {
            const { params: { id } } = request;
            let user = await UsersService.getById( id );
            if (!user) {
                Response.error(response, new createError.NotFound());
            }else Response.success(response, 200,  `Usuario ${id}`, user);
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    createUser: async (request, response) => {
        try {
            const { body } = request;
            if (!body || Object.keys(body).length === 0) {
                Response.error(response, new createError.BadRequest());
            }else{
                const insertedId = await UsersService.createUser(body);
                Response.success(response, 201, "Usuario agregado", insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    updateUser: async (request, response) => {
        try {
            const { params: { id }, body } = request;
            if (!body || Object.keys(body).length === 0) {
                Response.error(response, new createError.BadRequest());
            }else {
                const update = await UsersService.updateUser(id, body);
                if (!update) {
                    Response.error(response, new createError.NotFound());
                } else {
                    Response.success(response, 200, "Usuario actualizado", update);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    },
    deleteUser: async (request, response) => {
        try {
            const { params: { id } } = request;
            const userDelete = await UsersService.deleteUser(id);
            if (!userDelete) {
                Response.error(response, new createError.NotFound());
            } else {
                Response.success(response, 200, "Usuario eliminado", userDelete);
            }
        } catch (error) {
            debug(error);
            Response.error(response);
        }
    }
};