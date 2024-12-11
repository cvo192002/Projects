const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Ingredient subdocument
const ingredientSchema = mongoose.Schema({
  name: {type : String} ,
  quantity: {type: String} ,
  notes: {type: String}
}, { _id: false });

// Define the Full Name subdocument
const fullNameSchema = mongoose.Schema({
  first: {type: String, required: true}, 
  last: {type: String, required: true}
}, { _id: false });

// Define the Review Schema
const reviewSchema = mongoose.Schema({
  description: {type : String, required: true} ,
  rating: {type: Number, required:true} , // Assuming the rating is a number of stars
  dateCreated: { type: Date, default: Date.now, required:true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required:true } // Reference to the User schema
});

// Define the User Schema
const userSchema = mongoose.Schema({
    fullName: {type : fullNameSchema, required: true}, 
    username: { type: String, unique: true, required: true }, // Unique username
    email: { type: String, unique: true , required: true} // Unique email address
  });

// Define the Recipe Schema
const recipeSchema = mongoose.Schema({
  name: {type: String} ,
  description: {type: String} ,
  pictureUrl: {type : String} ,
  prepTime: {type : Number}, //  prep time in minutes
  cookingTime:{type: Number} , // cooking time in minutes
  directions: { type: [String]}, // Array of step by step directions
  ingredients: {type :[ingredientSchema]} , // Array of Ingredient subdocuments
  userReviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }] // Array of ObjectIds referencing Review documents
});

// Create models
const Recipe = mongoose.model('Recipe', recipeSchema);
const Review = mongoose.model('Review', reviewSchema);
const User = mongoose.model('User', userSchema);

// Export the models
module.exports = {
  Recipe,
  Review,
  User
};