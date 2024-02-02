import User from './../Models/User.js';

async function createuser(data, response){
    try {
        let user = data;
        user.name = data.name.trim();
        user.password =  data.password.trim();
        user.password_2 = data.password_2.trim();
        user.email = data.email.trim();

        if(user.name === ""){
            return response.status(411).json("Insira seu nome.");
        } else if(user.password === "" || user.password_2 === "" || (user.password !== user.password_2)){
            return response.status(411).json("Senha incopatível.");
        } else if(!user.email.includes("@")){
            return response.status(411).json("Email invalido.");
        }
        
        await User.create(user);
        return response.status(201).json("Conta criada com sucesso!");
    } catch (error) {
        return response.status(400).json("Não foi possível criar uma conta. Tente novamente!");
    }
}

// async function login(request, response){
//     try {
//         //terminar...
//         //criar token
//         return response.status(201).json();
//     } catch (error) {
//         return response.status(400).json(error);
//     }
// }

const UserService = {
    createuser,
}

export default UserService;