import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NurseryReviews({ nurseryName }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`https://nineday-neww.onrender.com/${nurseryName}`)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err));
    }, [nurseryName]);

    return (
        <div>
            <h2>{nurseryName}の口コミ</h2>

            {reviews.map((review, index) => (
                <div key={index}>
                    <h3>評価スコア：{review.score}</h3>
                    <p>{review.comment}</p>
                </div>
            ))}
        </div>
    );
}

export default NurseryReviews;
