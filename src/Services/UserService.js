import User from './../Models/User.js';

async function createuser(data, response){
    try {
        let firstName = data.firstName.trim();
        let lastName = data.lastName.trim();
        let password = data.password.trim();
        let password_2 = data.password_2.trim();
        let email = data.email.trim();

        if(firstName === "" || lastName === ""){
            return response.status(411).json("Insira seu nome e Sobrenome.");
        } else if(password === "" || password_2 === "" || (password !== password_2)){
            return response.status(411).json("Senha incorreta.");
        } else if(!email.includes("@")){
            return response.status(411).json("Email invalido.");
        }
        
        await User.create(data);
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