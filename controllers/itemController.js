const Category = require('../models/category');
const async = require('async');
const Item = require('../models/item')

exports.index=function(req,res){
    res.send('Index')
}