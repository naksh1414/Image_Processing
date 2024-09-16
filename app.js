import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';  
import productRoutes from './routes/productRoutes.js'; 
import upload from './middlewares/multerConfig.js'; 
import { errorHandler } from './middlewares/errorHandler.js';  

const app = express();

app.use(express.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes); 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
