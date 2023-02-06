const express = require("express");

const productsRouter = require("./routes/productsRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/products", productsRouter);

module.exports = app;
