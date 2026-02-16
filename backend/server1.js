// const express = require("express");
// const mysql = require("mysql2");
// const session = require("express-session");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const app = express();
// app.use(express.json());
// app.use(cors({
//     origin: true, // React app origin
//     credentials: true,
// }));

// // ----------- MIDDLEWARE -----------

// // Session middleware
// app.use(session({
//     secret: 'supersecretkey', // change in production
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false } // set true if using HTTPS
// }));


// // ----------- DATABASE -----------
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'chheang',
//     password: '123456',
//     database: 'marketplace'
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to MySQL:", err);
//         return;
//     }
//     console.log("Connected to MySQL");
// });

// // ----------- SIGN UP -----------
// app.post('/sign_up', async (req, res) => {
//     const { firstName, lastName, gender, birth, email, password } = req.body;

//     try {
//         // hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const sql = 'INSERT INTO users (first_name, last_name, gender, birth, email, password) VALUES (?, ?, ?, ?, ?, ?)';
//         db.query(sql, [firstName, lastName, gender, birth, email, hashedPassword], (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });

//             // store user in session
//             req.session.user = { id: result.insertId, firstName, email };
//             res.json({ message: "User registered successfully!", user: req.session.user });
//         });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ----------- LOGIN -----------
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     const sql = 'SELECT * FROM users WHERE email = ?';
//     db.query(sql, [email], async (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });

//         if (results.length === 0) {
//             return res.status(400).json({ error: "User not found" });
//         }

//         const user = results[0];

//         // compare password
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             return res.status(400).json({ error: "Incorrect password" });
//         }

//         // store user in session
//         req.session.user = { id: user.id, firstName: user.first_name, email: user.email };
//         res.json({ message: "Login successful", user: req.session.user });
//     });
// });

// // ----------- LOGOUT -----------
// app.post('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if(err) return res.status(500).json({ error: "Logout failed" });
//         res.json({ message: "Logged out successfully" });
//     });
// });


// // Then /current_user
// app.get('/current_user', (req, res) => {
//     if(req.session.user) {
//         res.json({ user: req.session.user.firstName });
//     } else {
//         res.json({ user: null });
//     }
// });


// // ----------- SERVER -----------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
