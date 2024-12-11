import {User} from './user.js'; 

//POST 
export async function createUser(req, res) {
    try{
        const newUser = new User(req.body); 

        await newUser.save(); 
        res.status(201).json(newUser);
    }catch (error) {
        if (error.name === "Error Validating Data") {
            return res.status(400).json({message: error.massage}); 
        } else {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}; 

//GET 
export async function getAllUsers (req, res) {
    try{
        const users = await User.find(); 
        res.status(200).son(users); 
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"}); 
    }
}; 

//GET 
export async function getUser (req, res) {
    try {
        const user = await User.findById(req.params.id); 
        if(!user) {
            return res.status(404).json({message:"Cannot Find User"}); 
        }
        res.status(200).json(user);
    }catch(error) {
        res.status(500).json({message: "Internal Server Error"}); 
    }
}; 

//PUT 
export async function updateUser(req, res) {
    try {
        if (!user) {
            return res.status(404).json({message: "Cannot Find User"});
        }
        res.status(200).json(user);
    } catch (error) {
        if (error.name === "Error Validating Data") {
            return res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}; 

//DELETE 
export async function deleteUser (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id); 
        if(!user) {
            return res.status(404).json({message: "Cannot Find User"});
        }
       res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"}); 
        }
};