import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReviewForm.css';  // CSSファイルをインポートします。

const ReviewForm = ({ nurseryId, onReviewSubmit }) => {
  const [yard, setYard] = useState('良い点');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (review.length < 5 || review.length > 1000) {
      alert('レビューは最低限5文字以上は入力してください。');
      return;
    }

    const newReview = {
      yard: yard,
      rating: rating,
      comment: review,
    };

    axios.post(`https://nineday-neww.onrender.com/${nurseryId}/reviews`, newReview)
      .then(res => {
        onReviewSubmit(newReview);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="review-form">
    <div className="review-card">
      <div className="review-card-body">
        <form onSubmit={handleSubmit} className="reviewForm">
        

          <div className="reviewField">
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
          </div>

          <div className="reviewField">
            <label>
              レビュー (5文字以上1000文字以内):
              <textarea value={review} onChange={e => setReview(e.target.value)} className="inputBox" placeholder="コメントを入力" />
            </label>
            <p>文字数: {review.length}</p>
          </div>

          <div className="reviewField">
            <input type="submit" value="投稿" className="inputSubmit"/>
          </div>
        </form>
      </div>
    </div>
    </div>

  );
};

export default ReviewForm;
