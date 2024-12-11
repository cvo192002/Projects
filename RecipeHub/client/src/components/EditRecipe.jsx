import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { updateRecipe } from './CRUD';
import './EditRecipe.scss';

const EditRecipe = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(location.state?.recipe || {
        name: '',
        description: '',
        image: '',
        prepTime: '',
        cookTime: '',
        directions: [],
        ingredients: [{ name: '', amount: '' }],
    });

    useEffect(() => {
        // No fetching since we're using location.state to pass the existing recipe for edit
    }, []);

    const handleChange = ({ target: { name, value } }) => setRecipe(prev => ({ ...prev, [name]: value }));

    const handleListChange = (name, index, value) => {
        setRecipe(prev => ({
            ...prev,
            [name]: prev[name].map((item, i) => i === index ? value : item)
        }));
    };

    const handleAddToList = (name) => {
        setRecipe(prev => ({
            ...prev,
            [name]: [...prev[name], name === 'directions' ? '' : { name: '', amount: '' }]
        }));
    };

    const handleRemoveFromList = (name, index) => {
        setRecipe(prev => ({
            ...prev,
            [name]: prev[name].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRecipe(id, recipe);
            navigate(`/recipes/${id}`);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-recipe-form">
            {/* Simplified form inputs for brevity */}
            <h2>Spice up the Recipe! 🌶️</h2>
            <input name="name" value={recipe.name} onChange={handleChange} placeholder="What's the dish?" required />
            <textarea name="description" value={recipe.description} onChange={handleChange} placeholder="What's cooking?" required />
            {/* Additional form elements... */}
            <button type="submit">Cast the Update Spell ✨</button>
        </form>
    );
};

export default EditRecipe;
