const express = require('express');
const router = express.Router();
const db = require('../database');
const upload = require('../middleware/upload');

// CREATE PRODUCT
router.post('/products', upload.single('product_image'), (req, res) => {
    if (!req.session.user){
        return res.status(401).json({ message: 'Unauthorized'});
    }
    if(!req.file) {
        return res.status(400).json({ message: 'Image required!' });
    }
    const { price, description } = req.body;
    const userId = req.session.user.id;
    const image = req.file ? req.file.path : null;

    const sql = `
        INSERT INTO products (user_id, product_image, price, description)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [userId, image, price, description], (err) => {
        if (err) {
            console.error('Insert error');
            console.log("SESSION:", req.session.user);
            console.log("USER ID:", userId);
            console.log("BODY:", req.body);
            console.log("FILE:", req.file);
            return res.status(500).json(err);
        }
        res.json({ message: 'Product created!'});
    })
})

// GET ALL PRODUCTS (for home page)
router.get('/products', (req, res) => {
    const sql = `SELECT * FROM products ORDER BY created_at DESC`;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

module.exports = router;