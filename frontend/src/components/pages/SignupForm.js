import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.png'; // Replace with your logo file

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  const signUp = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);

      if (result.error) {
        alert(result.error);
      } else {
        navigate('/login'); // Navigate to login page
      }
    } catch (error) {
      console.error('An error occurred while signing up:', error);
    }
  }

  return (
    <div className="signup">
      {/* <img src={logo} alt="Logo" /> */}
      <form onSubmit={signUp}>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log In</Link></p>
    </div>
  );
}

export default SignUpForm;
