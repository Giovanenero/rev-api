import User from './../Models/User.js';
import UserVerification from '../Models/UserVerification.js';

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

        user.password = await encrypt(user.password);
        //Cria o usuário e adiciona ao banco de dados e retorna para o frontend
        await User.create(user);

        let status = await sendEmail(user.email);
        if(status === 200){
            return response.status(201).json("Enviamos um código de ativação para o seu email.");
        } else {
            return response.status(400).json("Não foi possível criar uma conta. Tente novamente mais tarde!");
        }
    } catch (error) {
        return response.status(400).json("Não foi possível criar uma conta. Tente novamente mais tarde!");
    }
}


function generateCode(lenght){
    let maxLenght = 122;
    let minLenght = 65
    let code = [];
    for(let i = 0; i < lenght; i++){
        let index = Math.floor(Math.random() * (maxLenght - minLenght + 1)) + minLenght;
        if(index > 90 && index < 97){
            lenght = lenght + 1;
        } else {
            code.push(index);
        }
    }
    return String.fromCharCode(...code);
}

async function encrypt(value){
    // https://youtu.be/bc0HbYO_AuQ?si=STH6IMypkVdE1G4b
    return await bcrypt.hash(value, 10);
}

async function sendEmail(email){
    // https://youtu.be/q2sPzKgBMaA?si=wAyeusLr3IJx_bUC

    let user = await User.find({email: email});
    user = user[0];
    let code = generateCode(6);
    let html = `<article><h2>Olá, ${user.name}!</h2><br/><p>Obrigado por se cadastrar no nosso sistema.</p><br/><p>Seu código de ativação: <h4>${code}</h4></p><br/><p>att,</p><br/><br/><p>Restauração & Vida</p></article>`
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
        html: html
    }).then(() => {
        let verification = {
            user_id: user._id,
            unique_string: code,
            created_at: "12-12-2024", //test
            expires_at: "12-12-2024" //test
        }
        UserVerification.create(verification);
        return 200
    }).catch(() => {
        //Deleta o usuário e a verificação da collection
        UserVerification.deleteOne({user_id: user._id});
        User.deleteOne("_id: user._id");
        return 500
    })
}


async function login(request, response){
    try {
        let data = request.body;
        let user = await User.find({email: data.email});
        if(user.length > 0){
            return response.status(400).json("Email ou senha incorreto.");
        }
        user = user[0];
        if(!bcrypt.compareSync(encrypt(data.password), user.password)){
            return response.status(400).json("Email ou senha incorreto.");
        }

        if(!user.verified){
            //Envia um status 204 para verificação
            return response.status(204).json();
        }
        //terminar...
        //criar token
        //faz o login

        return response.status(200).json("NaN");
    } catch (error) {
        return response.status(400).json(error);
    }
}

async function verifyuser(request, response){
    try {
        let data = request.body;
        data.code = data.code.trim();
        data.email = data.email.trim();
        let userVerification = await UserVerification.findOne({unique_string: data.code});
        if(!userVerification){
            return response.status(400).json("Código inválido.");
        } 
        //converter unidade de tempo pra ver se o código ainda é válido;    
        //se não for válido, o cliente deve solicitar um novo código por email

        let user = await User.findOne({email: user.email});
        user.verified = true;
        await User.updateOne(user);
        UserVerification.deleteOne(userVerification);
        return response.status(200).json();
    } catch (error) {
        return response.status(400).json("Não foi possivel executar essa operação.");
    }
}

const UserService = {
    createuser,
    login,
    verifyuser
}

export default UserService;