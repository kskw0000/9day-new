const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // 'Bearer {token}'形式のため、splitで分けます
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401);  // トークンがない場合は'Unauthorized'を返す

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);  // トークンが無効な場合は'Forbidden'を返す
    req.user = user;  // トークンが有効な場合は、そのトークンのユーザー情報をreq.userに格納する
    next();  // 次のミドルウェアへ移る
  })
}

module.exports = authenticateToken;
