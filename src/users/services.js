const { ObjectId } = require('mongodb');

const { Database } = require('../database');

const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();//.find dentro de una coleccion es algo de mongodb D:
}

const getById = async (id) => {//las promesas se resuelven dentro de el controlador :D
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id);
    return await collection.findOne({_id: objectId});
}

const createUser = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId;
}
//update
const updateUser = async (id, userUpdate) => {
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id);
    await collection.updateOne(
        { _id: objectId },
        {
            $set: { ...userUpdate }
        }
        );
    return await getById(id);
}
//delete
const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    const user = await getById(id);
    if(user){
        await collection.deleteOne({ _id: new ObjectId(id) });
        return user;
    }else return null;
}

module.exports.UsersService = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
}