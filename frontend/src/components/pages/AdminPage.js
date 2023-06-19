import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <h1>管理ページ</h1>
      <nav>
        <ul>
          <li><Link to="/">ホーム</Link></li>
          <li><Link to="/admin/nurseries">保育園管理</Link></li>
          <li><Link to="/admin/reviews">口コミ管理</Link></li>
          <li><Link to="/signup">サインアップ</Link></li>  {/* 追加 */}
          <li><Link to="/login">ログイン</Link></li>  {/* 追加 */}
        </ul>
      </nav>
    </div>
  );
};

export default AdminPage;
