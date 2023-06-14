import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Nursery from '../components/pages/NurseryList';
import ReviewForm from '../components/pages/ReviewForm';
import Admin from '../components/pages/Admin';
import AdminReview from '../components/pages/AdminReview';
import AdminPage from '../components/pages/AdminPage'; // 新しいコンポーネントをインポート
import NurseryDeep from '../components/pages/Nuserydeep';  
import Header from '../components/parts/Header';
import Footer from '../components/parts/Footer';  // Footerをインポート


function App() {
  const [nurseries, setNurseries] = useState([]);
  const [selectedNursery, setSelectedNursery] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('https://nineday-neww.onrender.com')
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
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Nursery nurseries={nurseries} selectNursery={selectNursery} />} />
        <Route path="/nursery/:id" element={<NurseryDeep />} />  
        <Route path="/review" element={<ReviewForm nursery={selectedNursery} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/reviews" element={<AdminReview />} /> 
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
