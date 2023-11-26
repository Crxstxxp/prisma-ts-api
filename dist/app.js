"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
//routes
const routes_1 = __importDefault(require("./routes/routes"));
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use("/api", routes_1.default);
    }
    listen() {
        this.app.listen(this.app.get("port"));
        console.log("server on port ", this.app.get("port"));
    }
}
exports.App = App;
