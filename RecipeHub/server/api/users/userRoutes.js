import express from 'express'; 
import {createUser, getAllUsers, getUser, updateUser, deleteUser} from './userController.js';

const router = express.Router(); 

//POST
router.post('/', createUser); 

//GET 
router.get('/', getAllUsers); 
router.get('/:id', getUser);

//PUT
router.put('/:id', updateUser);

//DELETE 
router.delete('/:id', deleteUser);

export default router; 