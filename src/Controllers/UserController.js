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
        return UserService.login(request.body, response);
    } catch (error) {
        return response.status(400).json(error);
    }
}

async function verifyuser(request, response){
    try {
        return UserService.verifyuser(request.body, response);
    } catch (error) {
        return response.status(400).json(error);
    }
}


const UserController = {
    createuser,
    login,
    verifyuser,
}

export default UserController;