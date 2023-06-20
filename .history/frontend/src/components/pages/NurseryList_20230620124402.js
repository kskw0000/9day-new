import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBox from '../parts/SearchBox';
import SelectRegion from '../parts/SelectRegion';

const CardImage = ({ src, alt, placeholder }) => {
  const [loaded, setLoaded] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <img src={src} alt={alt} onLoad={handleOnLoad} style={{display: loaded ? 'block' : 'none'}} />
      {!loaded && <img src={placeholder} alt={alt} />}
    </>
  );
};

function NurseryList({ setSelectedNursery }) {

  const [nurseries, setNurseries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('全地域');

  const placeholderImg = 'path-to-your-placeholder-image'; // Set this to your placeholder image path

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_ROOT_URL}/nurseries`)
      .then(res => {
        const nurseries = res.data
        setNurseries(nurseries.filter(nurse => !!nurse.name))
      })
      .catch(err => console.log(err));
  }, []);

  const filteredNurseries = nurseries.filter(nursery => 
    (nursery.name && nursery.name.toLowerCase().includes(searchText.toLowerCase())) &&
    (selectedRegion === '全地域' || nursery.region === selectedRegion)
  );

  const firstRowNurseries = filteredNurseries.slice(0, filteredNurseries.length - 10);
  const secondRowNurseries = filteredNurseries.slice(filteredNurseries.length - 10);

  const searchAndSelectStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    margin: '20px 0'
  };

  return (
    <div>
      <div style={searchAndSelectStyle}>
        <SearchBox onSearch={setSearchText} />
        <SelectRegion onSelect={setSelectedRegion} />
      </div>
      <h2 className="title">保育園一覧</h2>
      <div className="card-container"> 
        {firstRowNurseries.map((nursery, index) => (
          <Link key={nursery.id} to={`/nursery/${nursery.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card">
              <div className="card-image">
                <CardImage src={nursery.thumbnail} alt={nursery.name} placeholder={placeholderImg} />
                <p>{nursery.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <h2 className="title">新着保育園10選 !</h2>

      <div className="card-container"> 
        {secondRowNurseries.map((nursery, index) => (
          <Link key={nursery.id} to={`/nursery/${nursery.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card">
              <div className="card-image">
                <CardImage src={nursery.thumbnail} alt={nursery.name} placeholder={placeholderImg} />
                <p>{nursery.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NurseryList;
