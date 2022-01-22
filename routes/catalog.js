const express = require("express");
const router = express.Router();

// Require controller modules.
var category_controller = require('../controllers/categoryController');
var item_controller = require('../controllers/itemController');

// GET catalog home page.
router.get('/',category_controller.category_list);

// GET Item & Category creation page
router.get('/item/create',item_controller.item_create_get);

router.get('/category/create',category_controller.category_create_get)

// GET Category detail
router.get('/category/:id',category_controller.category_detail);

// GET Item detail
router.get('/item/:id',item_controller.item_detail);

module.exports = router;