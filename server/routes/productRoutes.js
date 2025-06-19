const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');
const isAdmin = require('../middleware/isAdmin');

// Route: GET /api/products?page=1&limit=10
router.get('/', getProducts);

// Route: Admin-only
router.post('/admin-only', isAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

module.exports = router;
