//jshint esversion:6
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// mongoose.connect('mongodb://127.0.0.1:27017');
// mongoose.connection.on('connected', () => console.log('Connected'));
// mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",{
  useNewUrlParser: true,
   useUnifiedTopology: true
  });



const fruitSchema = new mongoose.Schema ({
  name:{ 
    type: String,
    required: [true, "Please Check entry no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Pretty Solid as a fruit"
// });

// fruit.save();



const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const pineapple = new Fruit({
//   name: "Pineapple",
//   score: 9,
//   review: "Great fruit"
// });

const mango = new Fruit({
  name: "Mango",
  score: 10,
  review: "Tasty fruit"
});

mango.save();

Person.updateOne({name:"John"}, {favFruit: mango}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully added.")
  }
});

const person = new Person({
  name: "John",
  age:37
});

// const person = new Person({
//   name: "Amy",
//   age:12, 
//   favFruit: pineapple
// });

person.save();















// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// });

// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour to me"
// });

// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird Texture!"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });


Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{

    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
})


// Fruit.updateOne({_id: "63f06f59fdb0cad0e8e42eff"}, {name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully upadated document.")
//   }
// });

// Fruit.deleteOne({name: "Apple"},  function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted document.")
//   }
// });


// Person.deleteMany({name: "John"},  function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted document.")
//   }
// });



// const findDocuments = function(db, callback) {
//   const collection = db.collection('fruits');
//   collection.find({}).toArray(function(err, fruits){
//     assert.equal(err, null);
//     console.log("Found the following records: ");
//     console.log(fruits);
//     callback(fruits);
//   });
// };

