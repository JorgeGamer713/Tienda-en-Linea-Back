import { Router, RouterOptions } from "express"
import { Request,Response } from "express"
import { authController } from "../controllers/authControllers";

class AuthRoutes {
    //objeto de tipo Router
    public router: Router;

    //Inicializa 
    constructor(){
        this.router = Router();
        this.config();
    }

    config() {
        this.router.post('/', authController.iniciarSesion);     
        this.router.post('/logout', authController.cerrarSesion);     
    }

}
const authRoutes = new AuthRoutes();
export default authRoutes.router