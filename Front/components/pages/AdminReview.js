import React, { useState } from 'react';
import axios from 'axios';

function AdminReview() {
    const [nurseryName, setNurseryName] = useState('');
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const review = {
            nurseryName: nurseryName,
            score: score,
            comment: comment
        };

        axios.post('https://nineday-neww.onrender.com', review)
            .then(res => {
                console.log(res);

                setNurseryName('');
                setScore(0);
                setComment('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2>口コミ情報の管理</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    保育園の名前:
                    <input type="text" name="nurseryName" value={nurseryName} onChange={e => setNurseryName(e.target.value)} />
                </label>
                <label>
                    評価スコア:
                    <input type="number" name="score" value={score} onChange={e => setScore(e.target.value)} />
                </label>
                <label>
                    口コミ:
                    <textarea name="comment" value={comment} onChange={e => setComment(e.target.value)} />
                </label>
                <button type="submit">口コミを追加</button>
            </form>
        </div>
    );
}

export default AdminReview;
