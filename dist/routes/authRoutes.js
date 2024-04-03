"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Ruta para el método GET
        this.router.get('/', (req, res) => {
            res.send('GET request received');
        });
        // Ruta para el método POST
        this.router.post('/sesion', authControllers_1.AuthController.iniciarSesion);
        // Puedes agregar más rutas aquí según sea necesario
        this.router.post('/', (req, res) => {
            res.send('POST request received');
        });
    }
}
const authRouter = new AuthRouter();
exports.default = authRouter.router;
//# sourceMappingURL=authRoutes.js.map