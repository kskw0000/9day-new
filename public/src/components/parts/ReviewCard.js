// ReviewCard.js
import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{review.yard}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{review.rating}</h6>
                <p className="card-text">{review.comment}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
