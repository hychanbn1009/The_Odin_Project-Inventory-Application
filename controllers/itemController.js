const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')
const { body,validationResult } = require("express-validator");

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
            // // There are errors. Render form again with sanitized values and error messages.
            // Item.findOne({'name':req.body.name})
            //     .exec(function (err, found_item) {
            //         if (err) { return next(err); }
            //         // Successful, so render.
            //         if (found_item){
            //             res.redirect(found_item.url)
            //         }
            //         else{
            //             item.save(function (err) {
            //                 if (err) { return next(err); }
            //                    // Successful - redirect to new record.
            //                    res.redirect(item.url);
            //                 });
            //         }
            // });
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