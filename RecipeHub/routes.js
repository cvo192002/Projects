const express = require('express');
const router = express.Router();
const { Recipe, Review, User } = require('./models');

// Routes for recipes
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('userReviews'); // Populate userReviews with actual review documents
        res.json(recipes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

router.post('/recipes', async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body);
        //res.status(201).json({ recipe, message: "Hello World" });
        res.status(201).send("Hello World");
        

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/recipes/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes for reviews
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/reviews', async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/reviews/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Routes for users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Nested route for creating a review under a recipe
router.post('/recipes/:recipeId/reviews', async (req, res) => {
    try {
        const review = await Review.create(req.body);
        const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, { $push: { reviews: review._id } }, { new: true });
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;