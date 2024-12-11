import mongoose from 'mongoose';
import {Reviews} from '../reviews/review.js';

// Define the Ingredient subdocument
const ingredientSchema = mongoose.Schema({
    name: {type : String} ,
    quantity: {type: String} ,
    notes: {type: String}
  }, { _id: false });

// Define the Recipe Schema
const recipeSchema = mongoose.Schema({
    name: {type: String} ,
    description: {type: String} ,
    pictureUrl: {type : String} ,
    prepTime: {type : Number}, //  prep time in minutes
    cookingTime:{type: Number} , // cooking time in minutes
    directions: { type: [String]}, // Array of step by step directions
    ingredients: {type :[ingredientSchema]} , // Array of Ingredient subdocuments
    userReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] // Array of ObjectIds referencing Review documents
  });

  let Recipe = mongoose.model('Recipe', recipeSchema);
  export {Recipe};