import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';
import styles from '../styles/ReviewCard.module.css';

const ReviewCard = ({ review, showLoginPopup }) => {
    const { isAuthenticated, token } = useContext(AuthContext);
    const [reply, setReply] = useState('');
    const [replies, setReplies] = useState([]); // 新しいstateを追加
    const [key, setKey] = useState(Math.random());

    useEffect(() => {
        setKey(Math.random());
    }, [isAuthenticated]);

    // レビューに対する返信を取得するeffectを追加
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_ROOT_URL}/reviews/${review._id}/replies`)
            .then(res => {
                setReplies(res.data);
            })
            .catch(err => console.error(err));
    }, [review._id]);

    const handleInputChange = (event) => {
        setReply(event.target.value);
    };

    const handleInputFocus = () => {
        if (!isAuthenticated) {
            showLoginPopup();
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_ROOT_URL}/reviews/${review._id}/replies`, { reply }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setReply('');
                    setReplies([...replies, res.data]); // 新たな返信を追加
                } else {
                    console.log('Error: ', res);
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className={styles.card} key={key}>
            <div className={styles.cardBody}>
                <h5 className={styles.userName}>{review.userName}</h5>
                <p className={styles.date}>{review.date}</p>
                <p className={styles.comment}>{review.comment}</p>

                {/* レビューに対する返信を表示 */}
                {replies.map(reply => (
                    <div key={reply._id}>
                        <h6>{reply.userName}</h6>
                        <p>{reply.text}</p>
                    </div>
                ))}

                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={reply}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder="返信を書く..."
                    />
                    <button type="submit">送信</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewCard;
