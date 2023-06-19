import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider'; // AuthContextをインポート

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // AuthContextからcloseLoginPopup関数を取得
  const { closeLoginPopup } = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  const login = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
  
      // Check if the fetch was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
  
      if (result.error) {
        alert(result.error);
      } else {
        localStorage.setItem('token', result.token);
        navigate('/NurseryList'); // Navigate to NurseryList page

        console.log("Closing popup...");  // 追加
        // ログイン成功時にポップアップを閉じる
        closeLoginPopup();
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    }
  }
  

  return (
    <form onSubmit={login}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange}
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
