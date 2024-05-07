import { Request, Response } from "express";
import { utils } from "../utils/utils";
import pool from "../utils/connections";
import { v4 as uuidv4 } from 'uuid';


class ProductoController {
  public async list(req: Request, res: Response) {
    try {
      // Obtener la lista de productos desde la base de datos
      const productos = await pool.then(async (connection) => {
        return await connection.query("SELECT * FROM productos");
      });

      return res.json({ productos, message: "Listado de Productos", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  // En tu método add del controlador
  public async add(req: Request, res: Response) {
    try {
      // Extraer los datos del producto del cuerpo de la solicitud
      const { nombre, descripcion, precio, color, tipo, imagen } = req.body;

      // Crear un objeto con los datos del producto
      const producto = {
        nombre,
        descripcion,
        precio,
        color,
        tipo,
        imagen,
      };

      // Insertar el producto en la base de datos
      const result = await pool.then(async (connection) => {
        return await connection.query("INSERT INTO productos SET ?", [producto]);
      });

      return res.json({ message: "Producto añadido correctamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }


  public async update(req: Request, res: Response) {
    try {
      // Extraer los datos actualizados del producto del cuerpo de la solicitud
      const { id, nombre, descripcion, precio, color, tipo, imagen } = req.body;

      // Crear un objeto con los datos actualizados del producto
      const productoActualizado = {
        id,
        nombre,
        descripcion,
        precio,
        color,
        tipo,
        imagen,
      };

      // Actualizar el producto en la base de datos
      const result = await pool.then(async (connection) => {
        return await connection.query("UPDATE productos SET ? WHERE id = ?", [productoActualizado, id]);
      });

      return res.json({ message: "Producto actualizado correctamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      // Extraer el ID del producto a eliminar del cuerpo de la solicitud
      const { id } = req.body;

      // Eliminar el producto de la base de datos
      const result = await pool.then(async (connection) => {
        return await connection.query("DELETE FROM productos WHERE id = ?", [id]);
      });

      return res.json({ message: "Producto eliminado correctamente", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const productoController = new ProductoController();


