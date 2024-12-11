import express from 'express';
import {createRecipe, getAllRecipes, getRecipe, updateRecipe, deleteRecipe} from './recipeController.js';
import reviewRouter from '../reviews/reviewRoutes.js';

const router = express.Router(); 

router.use('/:recipeId/reviews', reviewRouter); 
//POST route 
router.post('/', createRecipe);
//GET route 
router.get('/', getAllRecipes);
router.get('/:id', getRecipe); 
//PUT route
router.put('/:id', updateRecipe); 
//DELETE route 
router.delete('/:id', deleteRecipe); 

export default router 