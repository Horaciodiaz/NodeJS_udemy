const express = require('express');

const { UsersController } = require('./controller');

const router = express.Router();

module.exports.UsersAPI = (app)=>{
    router
        .get('/', UsersController.getUsers)//https://localhost:3000/api/users/
        .get('/:id', UsersController.getUser)//https://localhost:3000/api/users/12
        .post('/', UsersController.createUser)
        .put('/:id', UsersController.updateUser)
        .delete('/:id', UsersController.deleteUser);

    app.use('/api/users', router)// se concatena con los path del router :D
}