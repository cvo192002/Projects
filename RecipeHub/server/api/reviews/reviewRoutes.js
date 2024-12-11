import express from 'express'; 

import {createReview, getAllReviews, getReview, updateReview, deleteReview} from "./reviewController.js"; 

const router = express.Router({mergeParams: true}); 
//POST 
router.post('/', createReview); 

//GET 
router.get('/', getAllReviews); 
router.get('/:id', getReview); 

//PUT 
router.put('/:id', updateReview); 

//DELETE
router.delete('/:id', deleteReview); 

export default router; 