#! /usr/bin/env node

// console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// // Get arguments passed on command line
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
var mongoDB = `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.hsjll.mongodb.net/Inventory_Application?retryWrites=true&w=majority`
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []


function CategoryCreate(name,description,img_url,cb) {
    categoryDetails = {name: name,description:description,img_url:img_url};
        
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

function ItemCreate(name, description, category, price, stockOnHand,img_url,cb) {
  itemdetail = {name:name , description: description,category:category,price:price,stockOnHand:stockOnHand,img_url:img_url }
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
            CategoryCreate('Phantom Blood', 'The story follows Jonathan Joestar as he matures with and eventually combats his adoptive brother, the cunning and merciless Dio Brando. ','https://static.jojowiki.com/images/thumb/b/b1/latest/20191015213555/Volume_1.jpg/400px-Volume_1.jpg', callback);
        },
        function(callback) {
            CategoryCreate("Battle Tendency", "Taking place in 1938-39, the story follows the misadventures of Joseph Joestar (a.k.a. JoJo), grandson of Jonathan, as he masters his innate Ripple abilities in order to combat hostile, ancient super-beings named the Pillar Men, creators of the Stone Mask that plot to become the ultimate lifeforms. ",'https://static.jojowiki.com/images/thumb/3/34/latest/20191015213237/Volume_11.jpg/299px-Volume_11.jpg', callback);
        },
        function(callback) {
            CategoryCreate("Stardust Crusaders", "From 1988 to 1989,[1] the story follows Jotaro Kujo and his friends as they journey from Tokyo to Cairo, Egypt, to save the life of his mother, Holy Kujo, by defeating his family's resurrected archenemy, DIO. ",'https://static.jojowiki.com/images/thumb/0/0a/latest/20191015212952/Volume_17.jpg/299px-Volume_17.jpg', callback);
        },
        function(callback) {
            CategoryCreate("Diamond is Unbreakable", "In 1999, an older Jotaro Kujo travels to coastal Morioh, Japan, in order to meet high school freshman Josuke Higashikata who is the illegitimate child of Joseph Joestar. ",'https://static.jojowiki.com/images/thumb/b/ba/latest/20191015213904/Volume_36.jpg/299px-Volume_36.jpg', callback);
        },
        function(callback) {
            CategoryCreate("Vento Aureo", "Set in 2001 Italy, the story follows Giorno Giovanna and his dream to rise within the Neapolitan mafia and defeat the boss of Passione, the most powerful and influential gang, in order to become a 'Gang-Star'. ",'https://static.jojowiki.com/images/thumb/4/40/latest/20191015215618/Volume_49.jpg/300px-Volume_49.jpg', callback);
        },
        function(callback) {
            CategoryCreate("Stone Ocean", "In 2011, Florida; Jolyne Cujoh, daughter of Jotaro, is wrongfully accused of a crime she didn't commit and sent to a maximum security prison. While imprisoned, she struggles within a longstanding plot agreed between dead villain DIO and ideologue Enrico Pucci. ",'https://static.jojowiki.com/images/thumb/a/a6/latest/20191015214320/Volume_80.jpg/300px-Volume_80.jpg', callback);
        },
        ],
        // optional callback
        cb);
}

function createItems(cb) {
    async.parallel([
        function(callback) {
            ItemCreate('Jonathan Joestar', 'the protagonist of part 1', categories[0], 10,2,'https://static.wikia.nocookie.net/jjba/images/3/3f/JonathanP2.png/revision/latest/scale-to-width-down/342?cb=20170223113043', callback);
        },
        function(callback) {
            ItemCreate('Will Anthonio Zeppeli', "Jonathan Joestar's primary ally in Phantom Blood", categories[0], 20,2,'https://static.wikia.nocookie.net/jjba/images/7/76/WilliamA.png/revision/latest/scale-to-width-down/350?cb=20161028235627', callback);
        },
        function(callback) {
            ItemCreate('Joseph Joestar', 'the main protagonist of Part 2', categories[1], 30,2,'https://static.wikia.nocookie.net/jjba/images/1/1e/Joseph_Joestar_anime.png/revision/latest/scale-to-width-down/270?cb=20210211014910', callback);
        },
        function(callback) {
            ItemCreate('Lisa Lisa', 'Lisa Lisa is the mother of Joseph Joestar', categories[1], 10,7,'https://static.wikia.nocookie.net/jjba/images/8/8c/Lisa_Lisa_%28Anime%29.png/revision/latest/scale-to-width-down/270?cb=20170521193148', callback);
        },
        function(callback) {
            ItemCreate('Jotaro Kujo', 'the protagonist of Part 3', categories[2], 70,2,'https://static.wikia.nocookie.net/jjba/images/9/99/KujoAnime.png/revision/latest/scale-to-width-down/270?cb=20161029182608', callback);
        },
        function(callback) {
            ItemCreate("Josuke Higashikata","the protagonist of Diamond is Unbreakable",categories[3],40,0,'https://static.wikia.nocookie.net/jjba/images/2/24/JosukeAnime.PNG/revision/latest/scale-to-width-down/270?cb=20171212081940', callback);
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




