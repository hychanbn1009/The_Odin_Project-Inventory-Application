var express = require('express');
const { route } = require('.');
var router = express.Router();

// Require controller modules.
var category_controller = require('../controllers/categoryController');
var item_controller = require('../controllers/itemController');

// GET catalog home page.
router.get('/',category_controller.category_list);

router.get('/category/:id',category_controller.category_detail);

router.get('/item/:id',item_controller.item_detail);

module.exports = router;