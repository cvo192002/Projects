import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdateReview.scss'; 
import { updateReview } from './CRUD';

export const UpdateReview = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    
    const { review: existingReview, recipeId } = state;
    const [reviewData, setReviewData] = useState({
        description: '',
        rating: 0,
        user: '',
        id: '',
    });

    useEffect(() => {
        if (existingReview) {
            setReviewData({
                description: existingReview.description,
                rating: existingReview.rating,
                user: existingReview.user,
                id: existingReview._id,
            });
        }
    }, [existingReview]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateReview(recipeId, reviewData.id, {
                description: reviewData.description,
                rating: reviewData.rating,
                user: reviewData.user,
            });
            navigate(`/recipes/${recipeId}`);
        } catch (error) {
            console.error('Updating review failed:', error);
        }
    };
    
    return (
        <div className="update-review-form">
            <h2>Edit Review</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Your Name:</label>
                <input
                    id="user"
                    type="text"
                    name="user"
                    value={reviewData.user}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="rating">Rating (1-5):</label>
                <input
                    id="rating"
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={reviewData.rating}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Review:</label>
                <textarea
                    id="description"
                    name="description"
                    value={reviewData.description}
                    onChange={handleChange}
                    required
                />
                
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};
