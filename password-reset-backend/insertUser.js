import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hashedPassword = await bcrypt.hash('swetha@29', 10);

    const user = await User.create({
      name: 'swetha',
      email: 'sit20it081@sairamtap.edu.in',
      password: hashedPassword,
      role: 'user'
    });

    console.log('✅ User inserted:', user);
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting user:', err.message);
    process.exit(1);
  }
};

run();
