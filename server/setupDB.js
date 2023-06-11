const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./reviews.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the reviews database.');
});

db.serialize(() => {
    db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="reviews"', (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row) {
            db.run('DROP TABLE IF EXISTS reviews', err => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Dropped existing reviews table.');
            });
        }
    });
    
    db.run('CREATE TABLE IF NOT EXISTS reviews(id INTEGER PRIMARY KEY AUTOINCREMENT, nurseryId INTEGER, yard text, rating text, comment text, FOREIGN KEY(nurseryId) REFERENCES nurseries(id))', err => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Successfully created/modified the reviews table.');
    });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
