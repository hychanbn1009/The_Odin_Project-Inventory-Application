var express = require('express');
const { route } = require('.');
var router = express.Router();

// Require controller modules.
var category_controller = require('../controllers/categoryController');
var item_controller = require('../controllers/itemController');

// GET catalog home page.
router.get('/',category_controller.category_list);

module.exports = router;