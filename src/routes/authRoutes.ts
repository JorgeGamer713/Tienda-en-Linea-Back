import { Router, Request, Response } from 'express';
import { authController } from '../controllers/authControllers';

class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.post('/', authController.iniciarSesion)
        console.log("el fackin problema esta en las rutas, entiente >:v");        
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
