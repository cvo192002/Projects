import {Reviews} from './review.js';
import {Recipe} from '../recipes/recipe.js'; 

//POST 
export async function createReview(req, res){

    try {
        const {description, rating, user} = req.body;
        const recipeId = req.params.recipeId;
        
        //find the recipe by recipeId
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            console.log("Recipe not found");
            return res.status(404).json({message: "Recipe not found"});
            
        }

        //create new review
        const newReview = new Reviews({
            description,
            rating,
            user,
        });

        //save the review
        const savedReview = await newReview.save();

        //add review to the recipe
        recipe.userReviews.push(savedReview);
        await recipe.save();

        res.status(201).json(newReview);
    } catch (error) {
        //if the error is a validation error (client error), send a 400 error message
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        } else { //otherwise send 500 error (database error)
            //server related error (bad request)
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};


//GET 
export async function getAllReviews(req, res) {
    try{
        const recipeId = req.params.recipeId;
        const recipe = await Recipe.findById(recipeId).populate('userReviews');
        if(!recipe) {
            return res.status(404).json({message:"Cannot Find Recipe"});
        }
        res.status(200).json(recipe.userReviews); 
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
    }
}; 

//GET
export async function getReview(req, res){
    try {
        const review = await Reviews.findById(req.params.id);
        if(!review) {
            return res.status(404).json({message: "Cannot Find Review"});
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}; 

//PUT 
export async function updateReview(req, res) {
    try {
        const review = await Reviews.findByIdAndUpdate (
            req.params.id, 
            req.body, 
            {new: true, runValidators: true}); 
        if (!reviews) {
            return res.status(404).jscon({message: "Cannot Find Review"});
        }
        res.status(200).json(review);
    } catch (error) {
        if (error.name === "Error Validating Data") {
            return res.staqtus(400).json({message: error.message}); 
        } else {
            res.status(500).json({message: "Internal Server Error"}); 
        }
    }
}; 

//DELETE
export async function deleteReview(req, res) {
    try {
        const review = await Reviews.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({message: "Cannot Find Review "}); 
        }

        await Recipe.updateMany({}, {$pull:{userReviews: review._id} }); 

        res.status(201).json(review); 
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"}); 
    }
}; 