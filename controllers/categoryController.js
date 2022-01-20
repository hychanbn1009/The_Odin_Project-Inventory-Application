const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')
var mongoose = require('mongoose');

exports.category_list = function(req,res,next){
    Category.find()
    // .sort([['name','ascending']])
    .exec(function(err,list_categories){
        if (err){return next(err);}
            res.render('category_list',{title:'Category List',list_categories:list_categories})
    })
}

exports.category_detail=function(req,res,next){
    console.log(req.params.id)
    Item.find({'category':req.params.id})
    .exec(function(err,list_character){
        if (err){return next(err);}
        res.render('category_detail',{title:'Character List',list_character:list_character})
    })
}

