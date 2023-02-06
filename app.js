const express = require("express");
const path = require("path");
const productsRouter = require("./routes/productsRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).render("home");
});
app.use("/api/v1/products", productsRouter);

module.exports = app;
