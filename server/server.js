const express = require('express');
const cors = require('cors');
const http = require('http');
const axios = require('axios');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

const connectDB = require('./config/db');

async function startServer() {
  // ✅ Connect to MongoDB
  await connectDB();

  // ✅ Setup Apollo Server
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // ✅ Express middlewares
  app.use(cors());
  app.use(express.json());

  // ✅ REST routes
  app.use('/api/products', require('./routes/productRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/admin', require('./routes/adminRoutes'));

  // ✅ Socket.io search preview
  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);
    socket.on('searchPreview', async (data) => {
      const keyword = (data.keyword || '').toLowerCase();
      const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'i');
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const results = response.data.filter(p => {
          const title = p.title.toLowerCase();
          const desc = (p.description || '').toLowerCase();
          return title.startsWith(keyword) || keywordRegex.test(title) || keywordRegex.test(desc);
        }).slice(0, 6);
        socket.emit('searchPreviewResults', results);
      } catch (err) {
        console.error('🔴 Search preview error:', err.message);
        socket.emit('searchPreviewResults', []);
      }
    });
    socket.on('disconnect', () => {
      console.log('🔌 Client disconnected:', socket.id);
    });
  });

  // ✅ Start Express + Apollo + Socket.io server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Express + Socket.io running at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
