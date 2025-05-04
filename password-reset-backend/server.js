import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 4000, '0.0.0.0', () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
    );
    
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));