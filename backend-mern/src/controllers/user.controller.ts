import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
import connection from "../database";
import config from "../config/config";

const createToken = (user: User) =>{
    return jwt.sign({email: user.email}, config.jwtSecret, {expiresIn: 86400});
}

export const signUp = async (req:Request, res:Response):Promise<Response> =>{
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.lastname){
        return res.status(400).json({msj: "El registro no se logro realizar, verifique que los datos sean correctos."});
    }
    if(req.body.password.length < 9){
        return res.status(400).json({msj: "La contraseña debe ser mínimo de 10 caracteres"})
    }
    const collection = (await connection).collection("users");
    let user = await collection.findOne<User>({email: req.body.email})
    if(user !== null){
        return res.status(400).json({msj: `El usuario ${user.email}, que se intenta crear, ya existe`})
    }
    const salt = await bcrypt.genSalt(10);
    let newDocument = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    }
    
    collection.insertOne(newDocument);
    return res.status(200).json(newDocument);
}

export const signIn = async (req:Request, res:Response):Promise<Response> => {
    console.log(req.body)
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msj: "Ingresa el correo electrónico y la contraseña."});
    }
    const collection = (await connection).collection("users");
    let user = await collection.findOne<User>({email: req.body.email});
    if(user === null){
        return res.status(400).json({msj: "El correo electrónico o la contraseña no son validos."});
    }
    let isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch){
        return res.status(400).json({msj: "El correo electrónico o la contraseña no son validos."})
    }
    return res.status(200).json({msj:`¡Bienvenido ${user.name}!`, token: createToken(user)});
}