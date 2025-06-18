const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');
const isAdmin = require('../middleware/isAdmin');
// Route: GET /api/products
router.post('/admin-only', isAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

router.get('/', getProducts);


module.exports = router;
