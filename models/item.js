var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Categories', required: true},
    price: {type: Number, required: true },
    SOH: {type:Number,required:true, validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
    }}
  }
);

// Virtual for book's URL
ItemSchema
.virtual('url')
.get(function () {
  return '/catalog/item/' + this._id;
});

//Export model
module.exports = mongoose.model('Item', ItemSchema);
