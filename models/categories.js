var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategoriesSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
  }
);

// Virtual for book's URL
CategoriesSchema
.virtual('url')
.get(function () {
  return '/catalog/categories/' + this._id;
});

//Export model
module.exports = mongoose.model('Categories', CategoriesSchema);
