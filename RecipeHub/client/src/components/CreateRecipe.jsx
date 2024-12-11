import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from './CRUD';
import './CreateRecipe.scss';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    prepTime: '',
    cookTime: '',
    directions: [],
    ingredients: [{ name: '', amount: '' }],
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //since directions is an array this function helps 
  //to update the directions array
  const handleDirectionChange = (index, value) => {
    const newDirections = [...formData.directions];
    newDirections[index] = value;
    setFormData({ ...formData, directions: newDirections });
  };

  const addDirection = () => {
    setFormData({ ...formData, directions: [...formData.directions, ''] });
  };

  const removeDirection = (index) => {
    const newDirections = [...formData.directions];
    newDirections.splice(index, 1);
    setFormData({ ...formData, directions: newDirections });
  }


  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: newIngredients });
  };


  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', amount: '' }],
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    try {
      const response = await createRecipe(formData);
      console.log('Recipe created', response);
      navigate('/');
      
    } catch (e) {
      console.error('Creating recipe failed: ', e);
    }
  };



  
    return (
        <div className="create-recipe-wrapper">
        <form onSubmit={handleSubmit} className="create-recipe-form">
          <h2>Let's Cook Something Yummy! 😋</h2>
          <div className="form-group">
            <label htmlFor="name">Recipe Name</label>
            <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="E.g., Unicorn Cupcakes 🦄"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description of the recipe"
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL for the recipe"
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="prepTime">Prep Time (minutes)</label>
            <input
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              placeholder="Preparation time in minutes"
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="cookTime">Cook Time (minutes)</label>
            <input
              id="cookTime"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              placeholder="Cooking time in minutes"
            />
          </div>
          <div className="ingredients-container">
            <h3>Whatcha Need? 🥕🍳</h3>
            {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                <input
                    type="text"
                    name="name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    placeholder="E.g., Fairy Dust"
                    className="cute-input"
                />
                <input
                    type="text"
                    name="amount"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                    placeholder="E.g., A pinch"
                    className="cute-input"
                />
                <button type="button" className="remove-btn" onClick={() => removeIngredient(index)}>
                    🗑️
                </button>
                </div>
            ))}
            <button type="button" className="add-btn" onClick={addIngredient}>
                Add More Ingredients ✨
            </button>
            </div>

  
  
          <button type="submit" className="submit-btn">Conjure This Recipe ✨</button>
    </form>
  </div>
    );
  }
  
  export default CreateRecipe;
  
