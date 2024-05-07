import { Request, Response } from "express";
import validator from "validator";
import usuarioModelo from "../models/usuarioModelo";
import { utils } from "../utils/utils";
import pool from "../utils/connections";


class UsuarioController {


  public async list(req: Request, res: Response) {
    try {
      const usuarios = await pool.then(async (connection) => {
        return await connection.query("SELECT * FROM tbl_usuario");
      });
     return res.json({ message: "Listado de Usuario", code: 0,usuarios });
     //return res.json({ message: "Listado de Usuario", code: 0, userLTS: userLTS });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async add(req: Request, res: Response) {
    try {
      const usuario = req.body;


      if (!usuario.email || !usuario.password) {
        return res.status(400).json({ message: "Por favor, ingresa correo electrónico y contraseña", code: 1 });
      }


      if (!validator.isEmail(usuario.email)) {
        return res.status(400).json({ message: "El correo electrónico proporcionado no es válido", code: 1 });
      }


      if (!validator.isLength(usuario.password, { min: 6 })) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres", code: 1 });
      }
      if (!usuario.role || !usuario.role) {
        return res.status(400).json({ message: "Agrega un rol correctamente", code: 1 });
      }

      const existeUsuario = await usuarioModelo.getByEmail(usuario.email);
      if (existeUsuario) {
        return res.status(400).json({ message: "Ya existe un usuario con el mismo correo electrónico", code: 1 });
      } else {
        const encryptedText = await utils.hashPassword(usuario.password);
        usuario.password = encryptedText;

        const result = await usuarioModelo.add(usuario);

        return res.json({ message: "Usuario agregado correctamente", code: 0 });
      }
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async update(req: Request, res: Response) {
    try {
      const usuario = req.body;
      const existeUsuario = await usuarioModelo.getByEmail(usuario.email); // Verifica si el usuario existe
      if (!existeUsuario) {
        return res.status(404).json({ message: "Usuario no encontrado", code: 1 });
      }
      var encryptedText = await utils.hashPassword(usuario.password);
      usuario.password = encryptedText;
      const result = await usuarioModelo.update(usuario);


      // Actualiza el usuario si existe
      return res.json({ message: "Usuario modificado correctamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      console.log(req.body.email)
      const email = req.body.email; // Suponiendo que el parámetro de la URL contiene el correo electrónico del usuario a eliminar
      const existeUsuario = await usuarioModelo.getByEmail(email); // Verifica si el usuario existe
      if (!existeUsuario) {
        return res.status(404).json({ message: "Usuario no encontrado", code: 1 });
      }
      const result = await usuarioModelo.delete(email); // Elimina el usuario si existe
      return res.json({ message: "Usuario eliminado correctamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
  //encriptar la contraseña


}
export const usuarioController = new UsuarioController();