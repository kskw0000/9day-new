import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import ReviewCard from '../parts/ReviewCard';
import styles from '../styles/NuseryDeep.module.css'; // Add this line
import reviewStyles from '../styles/ReviewCard.module.css'; // 追加
import '../styles/App.css';

function Nuserydeep() {
  const { id } = useParams();
  const [nursery, setNursery] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 保育園の詳細情報を取得
    axios.get(`https://nineday-neww.onrender.com/${id}`)
      .then(res => {
        setNursery(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    // その保育園のレビューを取得
    axios.get(`https://nineday-neww.onrender.com/${id}/reviews`)
      .then(res => {
        setReviews(res.data || []);
      })
      .catch(err => console.log(err));
  }, [id]);


  const handleReviewSubmit = (review) => {
    const reviewWithNurseryId = { ...review, nurseryId: id };
    axios.post(`https://nineday-neww.onrender.com/${id}/reviews`, review)
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
    <div className={styles.container}> {/* Add className */}
      {nursery ? (
        <div>
          <div className={styles.imgBox}>
            <img src={nursery.image} alt="Nursery" className={styles.img} />
          </div>
          <div className="detailsBox">
            <h2 className="detailsText">{nursery.name}</h2>
            <p className="detailsText">{nursery.location}</p>
            <p className="detailsText">{nursery.type}</p>
            {/* Add other details as needed */}
          </div>
        </div>
      ) : (
        <p>保育園情報 Loading...</p>
      )}

    <ReviewForm nurseryId={id} onReviewSubmit={handleReviewSubmit} />

    <div className={reviewStyles.reviewsContainer}> {/* Add this line */}
      {reviews.length > 0 ? (
        <div>
          <h3 className={reviewStyles.reviewTitle}>口コミ</h3>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      ) : (
        <p>口コミはまだありません。</p> // reviewsが存在しない場合のメッセージ
      )}
    </div>
    </div>
  );
}

export default Nuserydeep;
