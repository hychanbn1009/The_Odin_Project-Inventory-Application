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
    res.render('item_form', { title: 'Item Category'});
}