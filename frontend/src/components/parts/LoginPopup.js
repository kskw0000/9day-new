import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider'; // AuthContextをインポート
import LoginForm from '../pages/LoginForm';
import styles from '../styles/LoginPopup.module.css'; // 必要に応じてスタイルを調整

const LoginPopup = () => { // propsの削除
    // AuthContextから取得
    const { isLoginPopupOpen, closeLoginPopup } = useContext(AuthContext);
    console.log('LoginPopup: isLoginPopupOpen', isLoginPopupOpen); // Debugging log

    // isLoginPopupOpenの状態に基づいて表示を切り替える
    if (!isLoginPopupOpen) return null;

    return (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <h2>ログインが必要です</h2>
                <LoginForm />
                <button onClick={closeLoginPopup}>閉じる</button> {/* closePopupをcloseLoginPopupに変更 */}
            </div>
        </div>
    );
};

export default LoginPopup;
