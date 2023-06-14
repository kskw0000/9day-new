// NurseryDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const NurseryDetails = ({ match }) => {
  const [nursery, setNursery] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`https://nineday-neww.onrender.com/${match.params.id}`)
      .then(res => {
        setNursery(res.data.nursery);
        setReviews(res.data.reviews);
      })
      .catch(err => console.log(err));
  }, [match.params.id]);
  

  return (
    <div>
      {nursery && (
        <>
          <h2>{nursery.name}</h2>
          <p>{nursery.location}</p>
          <p>{nursery.type}</p>
          <ReviewForm nurseryId={match.params.id} />
          <h3>レビュー</h3>
          {reviews.map((review, index) => (
            <div key={index}>
              <p>{review.text}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default NurseryDetails;
