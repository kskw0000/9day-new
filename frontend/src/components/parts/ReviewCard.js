// ReviewCard.js
import React from 'react';
import styles from '../styles/ReviewCard.module.css';

const ReviewCard = ({ review }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <h5 className={styles.userName}>{review.userName}</h5>
                <p className={styles.date}>{review.date}</p>
                <p className={styles.comment}>{review.comment}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
