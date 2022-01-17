const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')

exports.category_list = function(req,res,next){
    res.send('Category')
}