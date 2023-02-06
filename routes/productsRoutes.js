const express = require("express");
const categoriesController = require("../controllers/productController");

const router = express.Router();
//router.param('id', tourController.checkID);
router.route("/").get(categoriesController.getAllProducts);
//router.route("/:id").get(categoriesController.getOneCategory);

module.exports = router;
