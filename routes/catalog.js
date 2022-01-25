const express = require("express");
const router = express.Router();

// Require controller modules.
var category_controller = require('../controllers/categoryController');
var item_controller = require('../controllers/itemController');

// GET catalog home page.
router.get('/',category_controller.category_list);

// GET Item & Category creation page
router.get('/item/create',item_controller.item_create_get);

router.get('/category/create',category_controller.category_create_get);

// POST Item & Category creation page
router.post('/item/create',item_controller.item_create_post);

router.post('/category/create',category_controller.category_create_post);

// GET Item & Category deletion page
router.get('/item/delete',item_controller.item_delete_get);

router.get('/category/:id/delete',category_controller.category_delete_get);

// POST Item & Category deletion page
router.post('/item/:id/delete',item_controller.item_delete_post);

router.post('/category/:id/delete',category_controller.category_delete_post);

// GET Item & Category udpate page
router.get('/item/update',item_controller.item_update_get);

router.get('/category/update',category_controller.category_update_get);

// POST Item & Category udpate page
router.post('/item/update',item_controller.item_update_post);

router.post('/category/update',category_controller.category_update_post);

// GET Category detail
router.get('/category/:id',category_controller.category_detail);

// GET Item detail
router.get('/item/:id',item_controller.item_detail);

module.exports = router;