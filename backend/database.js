const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'chheang',
    password: '123456',
    database: 'marketplace'
});

db.connect(err => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = db;