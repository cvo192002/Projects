import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.scss';
import { getRecipe, deleteRecipe, createReview, getReviews, deleteReview } from './CRUD';


import { ReviewForm } from './ReviewForm';
import { FeedbackDisplay } from './FeedbackDisplay';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch recipe details and reviews from the backend
    const fetchRecipeAndReviews = async () => {
      try {
        const fetchedRecipe = await getRecipe(id);
        const fetchedReviews = await getReviews(id);
        console.log(getReviews(id));
        setRecipe(fetchedRecipe);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching recipe and reviews:', error);
      }
    };

    fetchRecipeAndReviews();
  }, [id]);

  

  const handleAddReview = async (reviewData) => {
    try {
      // Make sure to pass the recipe's id and the review data
      const newReview = await createReview(id, reviewData);
      // Update the reviews state with the new review
      setReviews(currentReviews => [...currentReviews, newReview]);
    } catch (error) {
      console.log(reviewData);
      // Handle any errors that occur during the request
      console.error('Error creating review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(id, reviewId);
      // Remove the review from state
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error(`Error deleting review with id ${reviewId}:`, error);
    }
  };

  
  //Recipe Update
  const goToUpdatePage = () => {
    navigate(`/update-recipe/${id}`, { state: { existingRecipe: recipe } });
  };

  //Review Update
  const goToUpdateReview = (review) => {
    navigate(`/update-review/${review._id}`, { state: { review: review, recipeId: id } });
  };
  

  //Recipe Delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      try {
        await deleteRecipe(id);
        navigate('/'); // Navigate to the recipe list or home page after deletion
      } catch (error) {
        console.error('Error deleting recipe:', error);
        // Optionally show an error message to the user
      }
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  //console.log(recipe.reviews);

  return (
    <div className="detail-container">
      <section className="recipe-hero" style={{ backgroundImage: `url(${recipe.image})` }}>
        <h1 className="recipe-title">{recipe.name}</h1>
      </section>
      
      <div className="recipe-content">
        <div className="recipe-buttons">
          <button onClick={() => navigate(`/update-recipe/${id}`)} className="btn update-recipe-button">Edit</button>
          <button onClick={handleDelete} className="btn delete-recipe-button">Delete</button>
        </div>
        <div className="recipe-description">
          <h2>About this recipe</h2>
          <p>{recipe.description}</p>
        </div>

        <div className="recipe-info">
          <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
          <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>
        </div>

        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name} - {ingredient.amount}</li>
            ))}
          </ul>
        </div>

        <div className="directions">
        <h2>Directions</h2>
        <ol>
          {recipe.directions.map((direction, index) => (
            <li key={index}>{direction}</li>
          ))}
        </ol>
      </div>
       <FeedbackDisplay reviews={reviews} onDelete={handleDeleteReview} onUpdate={goToUpdateReview} />
      {/* <ReviewForm onSave={handleAddReview}/>  */}
      
    </div>

      
       
    </div>
  );
};

export default Detail;
