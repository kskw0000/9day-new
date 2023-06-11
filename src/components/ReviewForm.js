import React, { useState } from 'react';
import axios from 'axios';
import './parts/ReviewForm.css';  // CSSファイルをインポートします。

const ReviewForm = ({ nurseryId, onReviewSubmit }) => {
  const [yard, setYard] = useState('良い点');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  
  const handleSubmit = event => {
    event.preventDefault();

    if (review.length < 100 || review.length > 1000) {
      alert('レビューは100文字以上1000文字以内で入力してください。');
      return;
    }

    const newReview = {
      yard: yard,
      rating: rating,
      comment: review,
    };

    axios.post(`http://localhost:3001/nurseries/${nurseryId}/reviews`, newReview)
      .then(res => {
        onReviewSubmit(newReview);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="review-card">
      <div className="review-card-body">
        <form onSubmit={handleSubmit}>
          <label>
            園庭・園舎:
            <select value={yard} onChange={e => setYard(e.target.value)}>
              <option value="良い点">良い点</option>
              <option value="改善点">改善点</option>
            </select>
          </label>

          <label>
            評価:
            <div>
              <label><input type="radio" value="とても不満" checked={rating === 'とても不満'} onChange={e => setRating(e.target.value)} /> とても不満</label>
              <label><input type="radio" value="不満" checked={rating === '不満'} onChange={e => setRating(e.target.value)} /> 不満</label>
              <label><input type="radio" value="やや不満" checked={rating === 'やや不満'} onChange={e => setRating(e.target.value)} /> やや不満</label>
              <label><input type="radio" value="おおむね満足" checked={rating === 'おおむね満足'} onChange={e => setRating(e.target.value)} /> おおむね満足</label>
              <label><input type="radio" value="満足" checked={rating === '満足'} onChange={e => setRating(e.target.value)} /> 満足</label>
              <label><input type="radio" value="とても満足" checked={rating === 'とても満足'} onChange={e => setRating(e.target.value)} /> とても満足</label>
            </div>
          </label>

          <label>
            レビュー (100文字以上1000文字以内):
            <textarea value={review} onChange={e => setReview(e.target.value)} />
          </label>
          <p>文字数: {review.length}</p>

          <input type="submit" value="投稿" />
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
