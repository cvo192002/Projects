import mongoose from 'mongoose'; 

// Define the Review Schema
const ReviewsSchema = new mongoose.Schema({
    description: {type : String, required: true} ,
    rating: {type: Number, required:true} , // Assuming the rating is a number of stars
    dateCreated: { type: Date, default: Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true } // Reference to the User schema
  });

  const Reviews = mongoose.model('Reviews', ReviewsSchema); 
  export {Reviews}; 