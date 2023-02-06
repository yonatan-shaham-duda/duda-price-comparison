const express = require("express");
const categoriesController = require("./../controllers/categoryController");

const router = express.Router();
//router.param('id', tourController.checkID);
router.route("/").get(categoriesController.getAllCategories);
//router.route("/:id").get(categoriesController.getOneCategory);

module.exports = router;
