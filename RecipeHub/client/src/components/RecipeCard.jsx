import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.scss';

const RecipeCard = ({ _id, name, image, description, rating }) => {
  return (
    <Link to={`/recipes/${_id}`} className="recipe-card-link">
      <div className="recipe-card">
        <div className="recipe-card-image" style={{ backgroundImage: `url(${image})` }}></div>
        <div className="recipe-card-content">
          <h3>{name}</h3>
          <p>{description}</p>
          <span className="recipe-rating">⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
