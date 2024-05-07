import { Request, Response } from "express";
import validator from "validator";
import model from "../models/authModelo";
import jwt from 'jsonwebtoken';
import {utils} from '../utils/utils';
import bcript from 'bcryptjs';

class AuthController {
  public async iniciarSesion(req: Request, res: Response, email: string) {
    try {
        const { email, password } = req.body;

        // Verificar que los datos no estén vacíos
        if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
            return res.status(400).json({ message: "Los campos son requeridos", code: 1 });
        }

        console.log(email + ' ' + password);
        // const lstUsers = await model.getuserByemail(email);
        const lstUsers = await model.getuserByEmail(email);
        console.log("Lts impresa");
        console.log(lstUsers);

        if (lstUsers.length <= 0) {
            return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
        }

        // Verificar la contraseña utilizando bcrypt
        //let result = utils.checkPassword(password,lstUsers[0].password);
        const passEnc = await utils.hashPassword(password);
        let result = utils.checkPassword(password,passEnc);
        console.log("Imprimiendo"+passEnc)
        console.log("Imprimiendo"+lstUsers[0].password)
        result.then((isValid) => {
            console.log("value"+ isValid)
            if (isValid) {
                const newUser = {
                    email: lstUsers[0].email,
                    password: lstUsers[0].password,
                    role: lstUsers[0].role
                };
                console.log(process.env.SECRET);
                const env = require('dotenv').config();
                let token = jwt.sign(newUser, process.env.SECRET, { expiresIn: '1h' });
                return res.json({ message: "Autenticación correcta", token, code: 0 });
            } else {
                return res.json({ message: "Contraseña Incorrecta", code: 1 });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ message: `${error.message}` });
    }
}
public cerrarSesion(req: Request, res:Response){
    res.clearCookie("token");
    return res.json({message: "sesion cerrada"})
}

}

export const authController = new AuthController();