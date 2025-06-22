const axios = require('axios');

const resolvers = {
  Query: {
    products: async (_, { search, category, sortBy = 'title', order = 'asc' }) => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        let products = response.data;

        // 🔍 Search
        if (search) {
          const keyword = search.toLowerCase();
          products = products.filter(p =>
            p.title.toLowerCase().includes(keyword) ||
            (p.description && p.description.toLowerCase().includes(keyword))
          );
        }

        // 🗂 Filter by category
        if (category) {
          products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        // ↕️ Sort
        products.sort((a, b) => {
          const aVal = a[sortBy];
          const bVal = b[sortBy];

          if (typeof aVal === 'string') {
            return order === 'asc'
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          }

          return order === 'asc' ? aVal - bVal : bVal - aVal;
        });

        return products;
      } catch (err) {
        console.error('🔴 GraphQL Error:', err.message);
        return [];
      }
    },
  },
};

module.exports = { resolvers };
