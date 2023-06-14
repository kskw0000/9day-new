import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBox from '../parts/SearchBox';
import SelectRegion from '../parts/SelectRegion'; 

function NurseryList({ setSelectedNursery }) {
  const [nurseries, setNurseries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('全地域');

  useEffect(() => {
    axios.get('https://nineday-neww.onrender.com')
      .then(res => setNurseries(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredNurseries = nurseries.filter(nursery => 
    (nursery.name && nursery.name.toLowerCase().includes(searchText.toLowerCase())) &&
    (selectedRegion === '全地域' || nursery.region === selectedRegion)
  );

  const searchAndSelectStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    margin: '20px 0'
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    flexBasis: 'calc(50% - 20px)', 
    margin: '10px' 
  };

  const hoverStyle = {
    backgroundColor: '#f5f5f5'
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div>
      <h2>保育園一覧</h2>
      <div style={searchAndSelectStyle}>
        <SearchBox onSearch={setSearchText} />
        <SelectRegion onSelect={setSelectedRegion} />
      </div>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        maxWidth: '80%', 
        margin: '0 auto' 
      }}> 

        {/* Update your component with this new JSX and styles */}
        <div className="card-container"> 
        {filteredNurseries.map((nursery, index) => (
        <Link to={`/nursery/${nursery.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="card">
      <div className="card-image">
        <img src={nursery.thumbnail} alt={nursery.name} />
        <p>{nursery.name}</p>
      </div>
    </div>
  </Link>
  ))}
</div>

      </div>
    </div>
  );
}

export default NurseryList;
