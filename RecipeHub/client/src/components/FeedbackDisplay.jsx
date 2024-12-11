import React from "react";
import "./FeedbackDisplay.scss";

export const FeedbackDisplay = ({ reviews, onDelete, onUpdate }) => {
  return (
      <div className="review-list">
        <h2>User Feedback</h2>
        {reviews.map(review => (
          <div className="review-item" key={review._id}> 
            <p><strong>Description:</strong> {review.description}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Date of Review:</strong> {new Date(review.dateOfReview).toLocaleDateString()}</p>
            <p><strong>User:</strong> {review.user}</p>
            <button className="update-button" onClick={() => onUpdate(review)}>Edit Review</button>
            <button className="delete-button" onClick={() => onDelete(review._id)}>Delete Review</button>
          </div>
        ))}
      </div>
    );


};
