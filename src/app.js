require("dotenv").config();
require("./database");

const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/ProductRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const userRoutes = require("./routes/UserRoutes");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json({ limit: "50mb" }));
  }

  routes() {
    this.server.use("/v1/produto", productRoutes);
    this.server.use("/v1/categoria", categoryRoutes);
    this.server.use("/v1/usuario", userRoutes);
  }
}

module.exports = new App().server;
