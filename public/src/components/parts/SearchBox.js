// SearchBox.js
import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="保育園名で検索"
      value={searchText}
      onChange={handleSearch}
    />
  );
};

export default SearchBox;
