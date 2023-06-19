import express from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { verbose } = sqlite3;
const db = new verbose.Database('./reviews.db', ...);
// the rest of your code...

const sqlite3 = verbose();
const app = express();
const port = 3001;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const db = new sqlite3.Database('./reviews.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the reviews database.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  )
`, err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Created users table.');
});

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

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;

  // Hash the password
  bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
          return res.status(500).json({ error: "Internal server error" });
      }
      db.run('INSERT INTO users(email, password) VALUES(?,?)', [email, hash], function(err) {
          if (err) {
            return console.log(err.message);
          }
          res.json({ id: this.lastID });
      });
  });
});

// Login existing users
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    bcrypt.compare(password, row.password, function(err, result) {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (result) {
        // TODO: You may want to create a token and return it here.
        // Create a JWT
        const token = jwt.sign({ id: row.id }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Replace 'your_secret_key' with your actual secret key
        res.json({ message: "Login successful", token: token });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    });
  });
});

app.post('/nurseries', upload.single('image'), (req, res) => {
    const { name, location, type } = req.body;
    const image = req.file ? req.file.filename : null;

    db.run('INSERT INTO nurseries(name, location, type, image) VALUES(?,?,?,?)', [name, location, type, image], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ id: this.lastID });
    });
});

// 保育園情報の登録
app.post('/nurseries', (req, res) => {
    const { name, location, type } = req.body;

    db.run('INSERT INTO nurseries(name, location, type) VALUES(?,?,?)', [name, location, type], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ id: this.lastID });
    });
});

// 保育園情報の編集
app.put('/nurseries/:id', (req, res) => {
    const { name, location, type } = req.body;

    db.run('UPDATE nurseries SET name = ?, location = ?, type = ? WHERE id = ?', [name, location, type, req.params.id], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ changes: this.changes });
    });
});

// 保育園情報の削除
app.delete('/nurseries/:id', (req, res) => {
    db.run('DELETE FROM nurseries WHERE id = ?', req.params.id, function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ changes: this.changes });
    });
});

// 保育園情報の取得
app.get('/nurseries', (req, res) => {
    db.all('SELECT * FROM nurseries', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// 保育園の詳細情報を取得するエンドポイント
app.get('/nurseries/:id', (req, res) => {
    db.get('SELECT * FROM nurseries WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(row);
    });
});

// その保育園のレビューを取得するエンドポイント
app.get('/nurseries/:id/reviews', (req, res) => {
    const { id: nurseryId } = req.params;

    db.all('SELECT * FROM reviews WHERE nurseryId = ?', [nurseryId], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(rows);
    });
});

// 新たなレビューを作成するエンドポイント
app.post('/nurseries/:id/reviews',authenticateToken, (req, res) => {
    const { yard, rating, comment } = req.body;
    const { id: nurseryId } = req.params;

    const sql = 'INSERT INTO reviews(nurseryId, yard, rating, comment) VALUES(?, ?, ?, ?)';
    const params = [nurseryId, yard, rating, comment];

    db.run(sql, params, function (err) {
      if (err) {
        return console.error(err.message);
      }
      res.json({ id: this.lastID, nurseryId, yard, rating, comment });
    });
});

app.listen(port, () => {
    console.log(`Server is running at :${port}`);
});
