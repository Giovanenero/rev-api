import User from './../Models/User.js';
import UserService from "./../Services/UserService.js";

async function createuser(request, response){
    try {
        return UserService.createuser(request.body, response);
    } catch (error) {
        return response.status(400).json("Não foi possível criar uma conta. Tente novamente!");
    }
}

async function login(request, response){
    try {
        //terminar...
        //criar token
        return response.status(201).json();
    } catch (error) {
        return response.status(400).json(error);
    }
}

async function getusers(request, response){
    try {
        const users = await User.find();
        return response.status(200).json(users);
    } catch (error) {
        return response.status(400).json(error.message);
    }
}

async function deleteuser(request, response){
    try {
        //await User.deleteOne(request.body);
        await User.findByIdAndDelete({_id: request.body});
        return response.status(200).json();
    } catch (error) {
        return response.status(400).json(error);
    }
}

export {
    createuser,
    getusers,
    deleteuser
}