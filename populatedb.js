#! /usr/bin/env node

// console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// // Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')
var Category = require('./models/category')
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []


function CategoryCreate(name,description,cb) {
    categoryDetails = {name: name,description:description };
        
    var category= new Category(categoryDetails)
    category.save(function (err) {
      if (err) {
        console.log('ERROR CREATING Category: ' + category);
        cb(err, null)
        return
      }
      console.log('New Category: ' + category);
      categories.push(category)
      cb(null, category);
    }   );
  }

function ItemCreate(name, description, category, price, stockOnHand,cb) {
  itemdetail = {name:name , description: description,category:category,price:price,stockOnHand:stockOnHand }
  var item = new Item(itemdetail);
       
  item.save(function (err) {
    if (err) {
        console.log('ERROR CREATING Item: ' + item);
        cb(err, null)
        return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}

function createCategories(cb) {
    async.series([
        function(callback) {
            CategoryCreate('Phantom Blood', 'The story follows Jonathan Joestar as he matures with and eventually combats his adoptive brother, the cunning and merciless Dio Brando. ', callback);
        },
        function(callback) {
            CategoryCreate("Battle Tendency", "Taking place in 1938-39, the story follows the misadventures of Joseph Joestar (a.k.a. JoJo), grandson of Jonathan, as he masters his innate Ripple abilities in order to combat hostile, ancient super-beings named the Pillar Men, creators of the Stone Mask that plot to become the ultimate lifeforms. ", callback);
        },
        function(callback) {
            CategoryCreate("Stardust Crusaders", "From 1988 to 1989,[1] the story follows Jotaro Kujo and his friends as they journey from Tokyo to Cairo, Egypt, to save the life of his mother, Holy Kujo, by defeating his family's resurrected archenemy, DIO. ", callback);
        },
        function(callback) {
            CategoryCreate("Diamond is Unbreakable", "In 1999, an older Jotaro Kujo travels to coastal Morioh, Japan, in order to meet high school freshman Josuke Higashikata who is the illegitimate child of Joseph Joestar. ", callback);
        },
        function(callback) {
            CategoryCreate("Vento Aureo", "Set in 2001 Italy, the story follows Giorno Giovanna and his dream to rise within the Neapolitan mafia and defeat the boss of Passione, the most powerful and influential gang, in order to become a 'Gang-Star'. ", callback);
        },
        function(callback) {
            CategoryCreate("Stone Ocean", "In 2011, Florida; Jolyne Cujoh, daughter of Jotaro, is wrongfully accused of a crime she didn't commit and sent to a maximum security prison. While imprisoned, she struggles within a longstanding plot agreed between dead villain DIO and ideologue Enrico Pucci. ", callback);
        },
        ],
        // optional callback
        cb);
}

function createItems(cb) {
    async.parallel([
        function(callback) {
            ItemCreate('Jonathan Joestar', 'the protagonist of part 1', categories[0], 10,2, callback);
        },
        function(callback) {
            ItemCreate('Will Anthonio Zeppeli', "Jonathan Joestar's primary ally in Phantom Blood", categories[0], 20,2, callback);
        },
        function(callback) {
            ItemCreate('Joseph Joestar', 'the main protagonist of Part 2', categories[1], 30,2, callback);
        },
        function(callback) {
            ItemCreate('Lisa Lisa', 'Lisa Lisa is the mother of Joseph Joestar', categories[1], 10,7, callback);
        },
        function(callback) {
            ItemCreate('Jotaro Kujo', 'the protagonist of Part 3', categories[2], 70,2, callback);
        },
        function(callback) {
            ItemCreate("Josuke Higashikata","the protagonist of Diamond is Unbreakable",categories[3],40,0, callback);
        },
        ],
        // optional callback
        cb);
}


async.series([
    createCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Category: '+categories);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




