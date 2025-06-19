const axios = require('axios');

const getProducts = async (req, res) => {
  try {
    // 1. Get page and limit from query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // 2. Fetch all products from fake API
    const response = await axios.get('https://fakestoreapi.com/products');
    const allProducts = response.data;

    // 3. Calculate start and end index for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // 4. Slice the array for the requested page
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    // 5. Send paginated response with metadata
    res.json({
      products: paginatedProducts,
      totalItems: allProducts.length,
      totalPages: Math.ceil(allProducts.length / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('❌ Error fetching fake products:', error.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

module.exports = { getProducts };
