import User from './../Models/User.js';

import env from "dotenv"
env.config();

import nodemailer from "nodemailer"
import bcrypt from "bcrypt"

async function createuser(data, response){
    try {
        // Remove espaços em branco
        let user = data;
        user.name = data.name.trim();
        user.password =  data.password.trim();
        user.password_2 = data.password_2.trim();
        user.email = data.email.trim();
        user.verified = false;
        
        // Verifica se os campos estão certos
        if(user.name === ""){
            return response.status(411).json("Insira seu nome.");
        } else if(user.password === "" || user.password_2 === "" || (user.password !== user.password_2)){
            return response.status(411).json("Senha incopatível.");
        } else if(!user.email.includes("@")){
            return response.status(411).json("Email invalido.");
        }

        // Verifica se o email já existe
        const verifyUser = await User.find({email: user.email});
        if(verifyUser.length > 0){
            return response.status(411).json("Email indiponível.");
        }

        //await sendEmail(user.email);
        user.password = await encrypt(user.password);

        //Cria o usuário e adiciona ao banco de dados e retorna para o frontend
        await User.create(user);
        return response.status(201).json("Conta criada com sucesso!");
    } catch (error) {
        return response.status(400).json("Não foi possível criar uma conta. Tente novamente mais tarde!");
    }
}

async function encrypt(value){
    // https://youtu.be/bc0HbYO_AuQ?si=STH6IMypkVdE1G4b
    try {
        return await bcrypt.hash(value, 10);
    } catch (error) {
        return {
            status: 400,
            message: "unauthorized"
        }
    }
}

async function sendEmail(email){
    // https://youtu.be/q2sPzKgBMaA?si=wAyeusLr3IJx_bUC
    const tramsporter = nodemailer.createTransport({
        host: process.env.TRANSPORTER_HOST,
        port: process.env.TRANSPORTER_PORT,
        secure: false,
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    })
    return await tramsporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verificação de Email",
        text: "Mensagem de texto!"
    }).then(() => { return 200 }).catch(() => { return 500 })
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