import React from 'react';

const regions = [
  '全地域',
  '北海道',
  '東北',
  '関東',
  '中部',
  '近畿',
  '中国',
  '四国',
  '九州'
];

function SelectRegion({ onSelect }) {
  return (
    <select style={{ margin: '20px 0', padding: '10px', backgroundColor: '#FFF9C4' }} onChange={e => onSelect(e.target.value)}>
      {regions.map((region, index) => (
        <option key={index} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}

export default SelectRegion;
