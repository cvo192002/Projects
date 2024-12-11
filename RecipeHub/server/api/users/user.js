import mongoose from 'mongoose';

//define schema
const UserSchema = new mongoose.Schema ({
    fullName: [{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    }],
    username: {type: String, unique: true}, 
    email: {type: String, unique: true},
})
const User = mongoose.model('User', UserSchema);
export {User};

