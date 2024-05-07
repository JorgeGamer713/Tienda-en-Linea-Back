import pool from '../utils/connections';

class ProductoModelo {
    public async list() {
        try {
            const result = await pool.then(async (connection) => {
                return await connection.query(
                    "SELECT * FROM productos"
                );
            });
            return result;
        } catch (error) {
            throw new Error(`Error al obtener la lista de productos: ${error.message}`);
        }
    }

    public async add(producto: any) {
        try {
            const result = await pool.then(async (connection) => {
                return await connection.query(
                    "INSERT INTO productos SET ?", [producto]
                );
            });
            return result;
        } catch (error) {
            throw new Error(`Error al agregar un nuevo producto: ${error.message}`);
        }
    }

    public async update(producto: any) {
        try {
            const updateQuery = `UPDATE productos 
                                 SET nombre='${producto.nombre}', descripcion='${producto.descripcion}', precio='${producto.precio}', imagen='${producto.imagen}'
                                 WHERE id='${producto.id}'`;
            console.log("Update: ", updateQuery);
            const result = await pool.then(async (connection) => {
                return await connection.query(updateQuery);
            });
            return result;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    public async delete(id: number) {
        try {
            const result = await pool.then(async (connection) => {
                return await connection.query(
                    "DELETE FROM productos WHERE id = ?", [id]
                );
            });
            return result;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }
}

const model = new ProductoModelo();
export default model;
