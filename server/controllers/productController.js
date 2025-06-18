const axios = require('axios');

const getProducts = async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    res.json(response.data); // returns product array to Angular
  } catch (error) {
    console.error('❌ Error fetching fake products:', error.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

module.exports = { getProducts };
