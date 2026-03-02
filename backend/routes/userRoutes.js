const express = require('express');
const router = express.Router();
const db = require('../database');
const upload = require('../middleware/upload');

// UPDATE OR CREATE PROFILE

router.post(
    "/profile",
    upload.single("avatar"),
    (req, res) => {

        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { bio, phone, address } = req.body || {};
        const avatar = req.file ? req.file.path : null;
        const userId = req.session.user.id;

        const checkSql = `SELECT * FROM user_profiles WHERE user_id = ?`;

        db.query(checkSql, [userId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            if (results.length > 0) {
                // UPDATE
                const updateSql = `
                    UPDATE user_profiles
                    SET bio=?, avatar=COALESCE(?, avatar), phone=?, address=?
                    WHERE user_id=?
                `;

                db.query(updateSql, [bio, avatar, phone, address, userId], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json(err);
                    }
                    res.json({ message: "Profile updated!" });
                });

            } else {
                // INSERT
                const insertSql = `
                    INSERT INTO user_profiles (user_id, bio, avatar, phone, address)
                    VALUES (?, ?, ?, ?, ?)
                `;

                db.query(insertSql, [userId, bio, avatar, phone, address], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json(err);
                    }
                    res.json({ message: "Profile created!" });
                });
            }
        });
    }
);

router.get('/profile', (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.session.user.id;

    const sql = `
        SELECT bio, avatar, phone, address
        FROM user_profiles
        WHERE user_id = ? LIMIT 1
    `;

    db.query(sql, [userId], (err, result) => {
        if(err) return res.status(500).json(err);

        if(result.length === 0) {
            return res.json({ bio: '', avatar: null, phone: '', address: '' });
        }
        res.json(result[0]);
    });
});

router.get('/navprofile', (req, res) => {
    if(!req.session.user){
        return res.status(401).json({ message: 'Unauthorized '});
    }

    const userId = req.session.user.id;
    const sql = `
        SELECT avatar FROM user_profiles 
            WHERE user_id = ? LIMIT 1
    `;

    db.query(sql, [userId], (err, result) => {
        if(result.length === 0) {
            return res.json({ avatar: null });
        }
        res.json(result[0]);
    })
})

module.exports = router;