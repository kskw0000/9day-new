import React from 'react';
import { Link } from 'react-router-dom';  // 追加

const AdminPage = () => {
  return (
    <div>
      <h1>管理ページ</h1>
      <nav>
        <ul>
          <li><Link to="/">ホーム</Link></li>
          <li><Link to="/admin">保育園管理</Link></li>
          <li><Link to="/admin/reviews">口コミ管理</Link></li> 
        </ul>
      </nav>
    </div>
  );
};

export default AdminPage;
