const express = require("express");

const categoriesRouter = require("./routes/categoriesRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/categories", categoriesRouter);

module.exports = app;
