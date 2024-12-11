import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './MainPage.scss';
import { getRecipes } from './CRUD.jsx';

const MainPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadRecipes = async () => {
      const recipesData = await getRecipes();
      setRecipes(recipesData);
      setFilteredRecipes(recipesData);
    };

    loadRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [search, recipes]);

  return (
    <div className='main-page-container'>
      <h2>What's Cooking? 🍳</h2>
      <div className="search-container">
        <input
          type='text'
          placeholder='🔍 Find a magical recipe...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="recipes">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe._id} {...recipe} />
          ))
        ) : (
          <p>Looks like the pantry's empty... 🧐</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
