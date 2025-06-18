const express = require('express');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB(); // 👈 must be called before setting routes

const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(express.json());

// Mount route at /api/products
app.use('/api/products', productRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});
