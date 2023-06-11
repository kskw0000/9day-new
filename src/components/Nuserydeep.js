import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import ReviewCard from './parts/ReviewCard';

function Nuserydeep() {
  const { id } = useParams();
  const [nursery, setNursery] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 保育園の詳細情報を取得
    axios.get(`http://localhost:3001/nurseries/${id}`)
      .then(res => {
        setNursery(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    // その保育園のレビューを取得
    axios.get(`http://localhost:3001/nurseries/${id}/reviews`)
      .then(res => {
        setReviews(res.data || []);
      })
      .catch(err => console.log(err));
  }, [id]);


  const handleReviewSubmit = (review) => {
    const reviewWithNurseryId = { ...review, nurseryId: id };
    axios.post(`http://localhost:3001/nurseries/${id}/reviews`, review)
      .then(res => {
        if (res.status === 200) {
          setReviews(prevReviews => [...prevReviews, res.data]);
        } else {
          console.log('Error: ', res);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      {nursery ? (
        <div>
          <h2>{nursery.name}</h2>
          <p>{nursery.location}</p> {/* locationを追加 */}
          <p>{nursery.type}</p> {/* typeを追加 */}
          {/* Add other details as needed */}
        </div>
      ) : (
        <p>保育園情報　Loading...</p>
      )}

{reviews.length > 0 ? (
    <div>
        <h3>レビュー</h3>
        {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
        ))}
    </div>
) : (
    <p>口コミはまだありません。</p> // reviewsが存在しない場合のメッセージ
)}

      <ReviewForm nurseryId={id} onReviewSubmit={handleReviewSubmit} />
    </div>
  );
}

export default Nuserydeep;
