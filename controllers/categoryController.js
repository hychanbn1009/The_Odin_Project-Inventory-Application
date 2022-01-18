const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')
var mongoose = require('mongoose');

exports.category_list = function(req,res,next){
    Category.find()
    .sort([['name','ascending']])
    .exec(function(err,list_categories){
        if (err){return next(err);}
            res.render('category_list',{title:'Category List',list_categories:list_categories})
            console.log(list_categories)
    })
}