const express = require("express");
const productsController = require("../controllers/productController");

const router = express.Router();
//router.param('id', tourController.checkID);
router.route("/").get(productsController.getAllProducts);
router.route("/raw").get(productsController.getRawProducts);
router.route("/flat").get(productsController.getFlatProducts);
router.route("/compared").get(productsController.getComaredProducts);
router.route("/products/:productSlug").get(productsController.getAProduct);
//router.route("/:id").get(categoriesController.getOneCategory);

module.exports = router;
