const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    price: Float!
    description: String
    category: String
    image: String
  }

  type Query {
    products(
      search: String
      category: String
      sortBy: String
      order: String
    ): [Product]
  }
`;

module.exports = { typeDefs };
