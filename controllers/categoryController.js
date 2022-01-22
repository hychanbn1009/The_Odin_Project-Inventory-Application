const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')

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
    async.parallel({
        list_character:function(callback){
            Item.find({'category':req.params.id})
            .exec(callback)
        },
        category_detail:function(callback){
            Category.findById(req.params.id)
            .exec(callback)
        },
    },function(err,results){
        if (err){return next(err);}
        res.render('category_detail',{title:'Character List',list_character:results.list_character,category_detail:results.category_detail})
    }
)}

exports.category_create_get = function(req,res,next){
    res.render('category_form', { title: 'Create Category'});
};