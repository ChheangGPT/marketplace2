const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database");

const router = express.Router();

// SIGN UP
router.post('/sign_up', async (req, res) => {
    const { firstName, lastName, gender, birth, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (first_name, last_name, gender, birth, email, password) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [firstName, lastName, gender, birth, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            req.session.user = { id: result.insertId, firstName, email };
            res.json({ message: "User registered successfully!", user: req.session.user });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        req.session.user = { id: user.id, firstName: user.first_name, email: user.email };
        res.json({ message: "Login successful", user: req.session.user });
    });
});

// LOGOUT
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
});

// CURRENT USER
router.get('/current_user', (req, res) => {
    console.log("Session:", req.session);
    if(req.session.user) {
        res.json({ user: req.session.user.firstName });
    } else {
        res.json({ user: null });
    }
});

module.exports = router;
