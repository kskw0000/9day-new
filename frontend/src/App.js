import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NurseryList from './components/pages/NurseryList';
import ReviewForm from './components/pages/ReviewForm';
import AdminReview from './components/pages/AdminReview';
import AdminPage from './components/pages/AdminPage';
import Admin from './components/pages/Admin';
import NurseryDeep from './components/pages/Nuserydeep';  
import Header from './components/parts/Header';
import Footer from './components/parts/Footer';  
import LoginForm from './components/pages/LoginForm';
import SignupForm from './components/pages/SignupForm'; 
import AuthProvider from './components/contexts/AuthProvider'; // import the AuthProvider
import LoginPopup from './components/parts/LoginPopup'; // ログインポップアップをインポート

// AuthContextから値を取得する部分を削除しました

function RouteConfig({ nurseries, selectNursery, selectedNursery }) {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<NurseryList nurseries={nurseries} selectNursery={selectNursery} />}
      />
      <Route 
        path="/NurseryList" 
        element={<NurseryList nurseries={nurseries} selectNursery={selectNursery} />}
      />
      <Route
        path="/nursery/:id"
        element={<NurseryDeep />}
      />
      <Route
        path="/review"
        element={<ReviewForm nursery={selectedNursery} />}
      />
      <Route
        path="/admin"
        element={<AdminPage />}
      />
       <Route
        path="/admin/nurseries" // ルートを追加
        element={<Admin />}
      />
      <Route
        path="/admin/reviews"
        element={<AdminReview />}
      />
      <Route
        path="/login"
        element={<LoginForm />}
      />
      <Route
        path="/signup"
        element={<SignupForm />}
      /> 
    </Routes>
  );
}

function App() {
  const [nurseries, setNurseries] = useState([]);
  const [selectedNursery, setSelectedNursery] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${process.env.REACT_APP_SERVER_ROOT_URL}/nurseries`)
        .then(response => {
          setNurseries(response.data);
        });
    }, 30000); 

    return () => clearInterval(interval);
  }, []);

  const selectNursery = (nursery) => {
    setSelectedNursery(nursery);
  };

  return (
    <AuthProvider>
      <Router>
        <Header />
        <RouteConfig nurseries={nurseries} selectNursery={selectNursery} selectedNursery={selectedNursery} />
        <Footer /> 

        {/* ログインポップアップを表示 */}
        <LoginPopup />
      </Router>
    </AuthProvider>
  );
}

export default App;
