const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')
const { body,validationResult } = require("express-validator");
const item = require('../models/item');

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
        res.render('item_form', { title: 'Create Item',list_categories:list_categories});
    })
}

exports.item_create_post = [

    body('name','Item name must be specified.').trim().isLength({ min: 1 }).replace(new RegExp("&"+"#"+"x27;", "g"), "'"),
    body('description','Description must be specified.').trim().isLength({ min: 1 }).replace(new RegExp("&"+"#"+"x27;", "g"), "'"),
    body('price','Price must be specified.').trim().isLength({ min: 1 }),
    body('category').escape(),
    body('stockOnHand','Stock On Hand must be specified.').trim().isLength({ min: 1 }),
    body('img_url','Img url must be specified.').trim().isLength({ min: 1 }),
    (req,res,next)=>{
        // Extract the validation errors from a request.
        var errors = validationResult(req);
        var item = new Item({
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            stockOnHand:req.body.stockOnHand,
            img_url:req.body.img_url,
        })
        if (!errors.isEmpty()) {
            Category.find({},'name')
                .exec(function(err,list_categories){
                    if(err){return next(err)}
                    res.render('item_form',{title:'Create Item',list_categories:list_categories,errors: errors.array()})
                })
                return
        }
        else{
            item.save(function (err) {
                if (err) { return next(err); }
                    // Successful - redirect to new record.
                    res.redirect(item.url);
                });
        }
    }
]

exports.item_delete_get = function(req,res,next){
    async.parallel({
        item:function(callback){
            Item.findById(req.params.id).exec(callback)
        },
    },function(err,results){
        if(err){return next(err)}
        if(results.item===null){
            res.redirect('/catelog/category');
        }
        res.render('item_delete',{title:'Delete Item',item:results.item})
    }
    )
};

exports.item_delete_post = function(req,res,next){
    async.parallel({
        item:function(callback){
            Item.findById(req.body.id).exec(callback)
        },
    },function(err,results){
        if(err){return next(err)}
        else{
            // Delete the item object and redirect to home page
            Item.findByIdAndRemove(req.body.item_id,function deleteItem(err){
                if(err){return next(err)}
                res.redirect('/')
            })
        }
    }
    )
};

exports.item_update_get = function(req,res,next){
    async.parallel({
        item:function(callback){
            Item.findById(req.params.id).exec(callback)
        },
        list_categories:function(callback){
            Category.find(callback)
        }
    },function(err,results){
        if(err){return next(err)}
        if(results.item===null){
            res.redirect('/catelog/category');
        }
        res.render('item_form',{title:'Update Item',item:results.item,list_categories:results.list_categories})
    }
    )
};

exports.item_update_post = function(req,res,next){
    res.send('update post')
};