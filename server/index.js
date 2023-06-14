const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;
const cors = require('cors');
const multer = require('multer');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/nurseries', upload.single('image'), (req, res) => {
      const { name, location, type } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const db = new sqlite3.Database('./reviews.db');
      db.run('INSERT INTO nurseries(name, location, type, image) VALUES(?,?,?,?)', [name, location, type, image], function(err) {
          if (err) {
            return console.log(err.message);
          }
          res.json({ id: this.lastID });
      });
      db.close();
  });

// 保育園情報の登録
app.post('/nurseries', (req, res) => {
    console.log(req.body);  // 追加
    const { name, location, type } = req.body;
    const db = new sqlite3.Database('./reviews.db');
    db.run('INSERT INTO nurseries(name, location, type) VALUES(?,?,?)', [name, location, type], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ id: this.lastID });
    });
    db.close();
});

// 保育園情報の編集
app.put('/nurseries/:id', (req, res) => {
    const { name, location, type } = req.body;
    const db = new sqlite3.Database('./reviews.db');
    db.run('UPDATE nurseries SET name = ?, location = ?, type = ? WHERE id = ?', [name, location, type, req.params.id], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ changes: this.changes });
    });
    db.close();
});

// 保育園情報の削除
app.delete('/nurseries/:id', (req, res) => {
    const db = new sqlite3.Database('./reviews.db');
    db.run('DELETE FROM nurseries WHERE id = ?', req.params.id, function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ changes: this.changes });
    });
    db.close();
});

// 保育園情報の取得
app.get('/nurseries', (req, res) => {
    const db = new sqlite3.Database('./reviews.db');
    db.all('SELECT * FROM nurseries', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

// 保育園の詳細情報を取得するエンドポイント
app.get('/nurseries/:id', (req, res) => {
    const db = new sqlite3.Database('./reviews.db'); // <--- add this line
    db.get('SELECT * FROM nurseries WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(row);
    });
    db.close();
});

  
// その保育園のレビューを取得するエンドポイント
app.get('/nurseries/:id/reviews', (req, res) => {
    const { id: nurseryId } = req.params;
    
    const db = new sqlite3.Database('./reviews.db');
    db.all('SELECT * FROM reviews WHERE nurseryId = ?', [nurseryId], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(rows);
    });
    db.close();
  });
  
  
// 新たなレビューを作成するエンドポイント
app.post('/nurseries/:id/reviews', (req, res) => {
    const { yard, rating, comment } = req.body;
    const { id: nurseryId } = req.params;
  
    const sql = 'INSERT INTO reviews(nurseryId, yard, rating, comment) VALUES(?, ?, ?, ?)';
    const params = [nurseryId, yard, rating, comment];
  
    const db = new sqlite3.Database('./reviews.db');
    db.run(sql, params, function (err) {
      if (err) {
        return console.error(err.message);
      }
      res.json({ id: this.lastID, nurseryId, yard, rating, comment });
    });
    db.close();
  });
  

app.listen(port, () => {
    console.log(`Server is running at :${port}`);
  });
  