const axios = require('axios');

app.get('/api/products', async (req, res) => {
  const response = await axios.get('https://fakestoreapi.com/products');
  res.json(response.data);
});
module.exports = Product;
