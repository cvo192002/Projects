import React, { useState } from 'react';
import './ReviewForm.scss';

export const ReviewForm = ({ onSave }) => {
    const [reviewData, setReviewData] = useState({
        description: '',
        rating: '',
        user: ''
    });

    const handleChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...reviewData,
            dateOfReview: new Date().toISOString()
        });
        setReviewData({ description: '', rating: '', user: '' }); // Reset form fields after submission
    };

    return (
        <div className="review-form-container">
            <h2>Leave Your Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-field">
                    <label htmlFor="user">Name:</label>
                    <input 
                        id="user" 
                        name="user" 
                        type="text" 
                        value={reviewData.user} 
                        onChange={handleChange} 
                        required
                        placeholder="Your name" 
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="rating">Rating (1-5):</label>
                    <input 
                        id="rating" 
                        name="rating" 
                        type="number" 
                        min="1" 
                        max="5" 
                        value={reviewData.rating} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="description">Review:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={reviewData.description} 
                        onChange={handleChange} 
                        required
                        placeholder="Your review here" 
                    />
                </div>
                <button type="submit" className="submit-button">Submit Review</button>
            </form>
        </div>
    );
};
