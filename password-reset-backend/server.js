import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://6818ef1bca51861adedb0d0f--soft-sunshine-020931.netlify.app', // Netlify deploy
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // 👈 This is required for sending cookies
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Password reset API is live');
});



app.use('/api/auth', authRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 4000, '0.0.0.0', () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
    );
    
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));