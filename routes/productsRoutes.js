const express = require("express");
const categoriesController = require("../controllers/productController");

const router = express.Router();
//router.param('id', tourController.checkID);
router.route("/").get(categoriesController.getAllProducts);
router.route("/raw").get(categoriesController.getRawProducts);
router.route("/flat").get(categoriesController.getFlatProducts);
router.route("/compared").get(categoriesController.getComaredProducts);
//router.route("/:id").get(categoriesController.getOneCategory);

module.exports = router;
