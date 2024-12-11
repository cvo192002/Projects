import {Recipe} from './recipe.js';

//POST
export async function createRecipe(req, res){
    try {
        const newRecipe = new Recipe (req.body); 
        await newRecipe.save(); 

        res.status(201).json(newRecipe);
    } catch (error) {
        if (error.name === "Error Validating Data") {
            return res.status(400).json({message:error.message});
        } else {
            res.status(500).json({message: "Internal Server Error"}); 
        }
    }
}; 

//GET 
export async function getAllRecipes (req, res) {
    try {
        const recipes = await Recipe.find(); 
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}; 

//GET
export async function getRecipe(req, res){
    try{
        const recipe = await Recipe.findById(req.params.id);

        if(!recipe){
            return res.status(404).json({message: "Cannot Find Recipe"});
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({message: "Internal Servor Error"});
    }
}; 

//PUT 
export async function updateRecipe(req, res){
    try{
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!recipe) {
            return res.status(404).json({message: "Cannot Find Recipe"});
        }
        res.status(200).json(recipe); 
    } catch (error) {
        if(error.name === "Error Validating Data") {
            return res.status(400).json({message: error.messAge});
        } else {
            res.status(500).json({message:"Internal Server Error"}); 
        }
    }
};

//DELETE 
export async function deleteRecipe(req, res){
    try{
        const recipe = await Recipe.findIdByAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json("Cannot Find Recipe");
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}; 