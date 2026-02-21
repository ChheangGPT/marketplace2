const express = require('express');
const router = express.Router();
const db = require('../database');

// UPDATE OR CREATE PROFILE
router.post('/profile', (req, res) => {
    console.log('PROFILE ROUTE HIT');
    if(!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { bio, phone, address } = req.body;
    const userId = req.session.user.id;

    const sql = `
        INSERT INTO user_profiles (user_id, bio, phone, address)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        bio = VALUES(bio),
        phone = VALUES(phone),
        address = VALUES(address)    
    `;

    db.query(sql, [userId, bio, phone, address], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: 'Profile updated successfully!'});
    })
})

module.exports = router;