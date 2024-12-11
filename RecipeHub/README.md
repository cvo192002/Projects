Mongoose Schema
Recipe
The Recipe schema represents a recipe in the cookbook.

name: Name of the recipe.
description: Description of the recipe.
pictureUrl: URL of the picture for the recipe.
prepTime: Preparation time in minutes.
cookingTime: Cooking time in minutes.
directions: Array of step-by-step directions for preparing the recipe.
ingredients: Array of ingredients used in the recipe, each with a name, quantity, and optional notes.
Review
The Review schema represents a user review for a recipe.

description: Description of the review.
rating: Rating given to the recipe (e.g., number of stars).
dateCreated: Date when the review was created (defaults to the current date).
user: Reference to the user who created the review.
User
The User schema represents a user of the cookbook application.

fullName: Full name of the user, consisting of first and last names.
username: Unique username for the user.
email: Unique email address for the user.
API Design
Recipes Endpoints
GET /api/recipes: Retrieve all recipes.
POST /api/recipes: Create a new recipe.
GET /api/recipes/:id: Retrieve a specific recipe by its ID.
PUT /api/recipes/:id: Update a specific recipe by its ID.
DELETE /api/recipes/:id: Delete a specific recipe by its ID.
Reviews Endpoints
GET /api/reviews: Retrieve all reviews.
POST /api/reviews: Create a new review.
GET /api/reviews/:id: Retrieve a specific review by its ID.
PUT /api/reviews/:id: Update a specific review by its ID.
DELETE /api/reviews/:id: Delete a specific review by its ID.
Users Endpoints
GET /api/users: Retrieve all users.
POST /api/users: Create a new user.
GET /api/users/:id: Retrieve a specific user by their ID.
PUT /api/users/:id: Update a specific user by their ID.
DELETE /api/users/:id: Delete a specific user by their ID.
Sub-resources
Reviews are associated with recipes as sub-resources. When retrieving recipes, reviews are populated with their actual documents.
Rationale
Schema Attributes: The attributes chosen for each schema represent the essential information needed for managing recipes, reviews, and users in the cookbook application.
Types and Validations: String, Number, and Date types are used appropriately based on the nature of the data. Unique constraints are applied to username and email fields to ensure data integrity.
RESTful API: The API endpoints follow RESTful principles, providing clear and consistent routes for CRUD operations on recipes, reviews, and users.