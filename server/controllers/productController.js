const axios = require('axios');

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = (req.query.search || '').toLowerCase();

    const response = await axios.get('https://fakestoreapi.com/products');
    let allProducts = response.data;

    // ✅ Step 1: Apply search filtering
    if (search) {
      allProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search)
      );
    }

    // Step 2: Paginate filtered results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    // Step 3: Respond with metadata
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
