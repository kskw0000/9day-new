import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

    // Tokenをローカルストレージからロードする
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    useEffect(() => {
        console.log("isLoginPopupOpen state updated", isLoginPopupOpen);
    }, [isLoginPopupOpen]);

    const login = (username, password) => {
        axios.post(`${process.env.REACT_APP_SERVER_ROOT_URL}/login`, { username, password })
            .then(response => {
                if (response.data.token) {
                    setAuthToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    setIsLoginPopupOpen(false);
                } else {
                    throw new Error("ログインに失敗しました");
                }
            })
            .catch(error => {
                console.error("Login Error:", error);
            });
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem("token");
    };

    // ログインポップアップを表示・非表示を切り替える関数を提供
    const showLoginPopup = () => setIsLoginPopupOpen(true);
    const closeLoginPopup = () => {
        console.log("closeLoginPopup function was called");  // 追加
        setIsLoginPopupOpen(false);
        console.log(isLoginPopupOpen);  // 追加
      }
    return (
        <AuthContext.Provider value={{
            authToken,
            login,
            logout,
            showLoginPopup,
            closeLoginPopup,
            isLoginPopupOpen
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
