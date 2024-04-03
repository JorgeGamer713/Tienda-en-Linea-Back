import { Request, Response } from "express";

class authController {
    public async iniciarSesion(req: Request, res: Response) {
        const { email, password } = req.body;
        return res.json({
            message: "Autenticación correcta",
            email: email,
            password: password
        })
    }
}

export const AuthController = new authController();
