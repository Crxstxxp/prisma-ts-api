import express, { Application, application } from "express";
import morgan from "morgan";

//routes
import routes from "./routes/routes";

export class App {
  app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes()
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api", routes);
  }

  listen() {
    this.app.listen(this.app.get("port"));
    console.log("server on port ", this.app.get("port"));
  }
}
