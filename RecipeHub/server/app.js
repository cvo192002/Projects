import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


import recipeRoutes from './api/recipes/recipeRoutes.js';
import userRoutes from './api/users/userRoutes.js';
import reviewRoutes from './api/reviews/reviewRoutes.js';



export default(port, dbUrl) => {
    mongoose.connect(dbUrl)
    .then(() => {
        console.log('MongoDB connection successful, MongoDB available ');
    })
    .catch(err => {
        console.error(`MongoDB connection error: ${err}`);
        process.exit(-1);
    });
    const app = express();


    app.use(cors());

    app.use(bodyParser.json());
    app.use(express.json());


    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, 'public')));


    // Routes
    app.use('/api/recipes', recipeRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/recipes/:recipeId/reviews', reviewRoutes);
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
      });

    // Starting the server
    app.listen(port, () => {
        console.log(`App started on port ${port}`);
    });
    return app;

}
