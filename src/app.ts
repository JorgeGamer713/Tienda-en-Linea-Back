import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';

class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }

    config(): void {
        this.app.set("port", 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use("/", authRoutes); // Aquí importamos la instancia de Router de authRoutes
    }
}

const server = new Server();
