const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')

exports.index=function(req,res){
    res.send('Index')
}

exports.item_detail=function(req,res,next){
    Item.findById(req.params.id)
    .exec(function(err,item){
        if (err){return next(err);}
            res.render('item_detail',{title:item.name,item:item})
    })
}

exports.item_create_get=function(req,res){
    Category.find({},'name')
    .exec(function(err,list_categories){
        if(err){return next(err)}
        res.render('item_form', { title: 'Item Category',list_categories:list_categories});
    })
}

exports.item_create_post = function(req,res,next){
    res.send('create post')
}

exports.item_delete_get = function(req,res,next){
    res.send('delete get')
};

exports.item_delete_post = function(req,res,next){
    res.send('delete post')
};

exports.item_update_get = function(req,res,next){
    res.send('update get')
};

exports.item_update_post = function(req,res,next){
    res.send('update post')
};