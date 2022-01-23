const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')
const { body,validationResult } = require("express-validator");

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

exports.category_create_post = [

    body('name','Category name must be specified.').trim().isLength({ min: 1 }).replace(new RegExp("&"+"#"+"x27;", "g"), "'")
    ,
    body('description','description must be specified.').trim().isLength({ min: 1 }).replace(new RegExp("&"+"#"+"x27;", "g"), "'")
    ,
    body('img_url','img_url must be specified').trim().isURL().isLength({ min: 1 }),
    (req,res,next)=>{
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        console.log(req.body.name)
        const category = new Category({
            name:req.body.name,
            description:req.body.description,
            img_url:req.body.img_url,
        })
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Category.findOne({'name':req.body.name})
                .exec(function (err, found_category) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    if (found_category){
                        res.redirect(found_category.url)
                    }
                    else{
                        category.save(function (err) {
                            if (err) { return next(err); }
                               // Successful - redirect to new record.
                               res.redirect(category.url);
                            });
                    }
            });
        }
    }
]

exports.category_delete_get = function(req,res,next){
    res.send('delete get')
};

exports.category_delete_post = function(req,res,next){
    res.send('delete post')
};

exports.category_update_get = function(req,res,next){
    res.send('update get')
};

exports.category_update_post = function(req,res,next){
    res.send('update post')
};