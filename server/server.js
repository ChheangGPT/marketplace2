const express = require("express");
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'chheang',
    password: '123456',
    database: 'marketplace'
});

const cors = require("cors");
app.use(cors());
app.use(express.json());

db.connect((err) => {
    if(err){
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
})

app.post('/sign_up', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

    db.query(sql, [firstName, lastName, email, password], (err, result) => {
        if(err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({ message: 'User registered successfully!'});
    })
    console.log(req.body);
})

app.post('/login', (req, res) => {
    console.log('Login')
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if(err) {
            res.status(500).json({ error: err.message});
            return;
        }

        if(results.length === 0) {
            res.status(400).json({ error: 'User not found'});
            return;
        }

        const user = results[0];

        if(user.password === password) {
            res.json({ message: 'Login successful', user: { id: user.id, firstName: user.first_name}});
        } else {
            res.status(400).json({ error: 'Incorrect password'});
        }
    })

})

app.get("/api/message", (req, res) => {
    res.json({ message: "Backend is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
