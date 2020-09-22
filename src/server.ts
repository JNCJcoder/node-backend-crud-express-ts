import express from "express";
import { createConnection } from "typeorm";
import compression from "compression";
import cors from "cors";

// Controllers
import Cliente from "./controllers/ClienteController";

class App {
  public app: express.Application;
  private server: express.Router;

  public constructor() {
    this.app = express();
    this.server = express.Router();

    this.middlewares();
    this.connectTypeORM();
    this.routes();
    this.app.use(this.server);
  }

  private middlewares(): void {
    this.app.use(compression());
    this.app.use(cors());
    this.app.disable("x-powered-by");
    this.app.use(express.json());
  }

  private routes(): void {
    this.server
      // Cliente
      .post("/cliente", Cliente.create)
      .get("/cliente", Cliente.index)
      .get("/cliente/:name", Cliente.read)
      .put("/cliente/:name", Cliente.update)
      .delete("/cliente/:name", Cliente.delete);
  }

  private async connectTypeORM(): Promise<void> {
    await createConnection();
  }
}

export default new App().app;
