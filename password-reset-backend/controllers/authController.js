import crypto from 'crypto';
import User from '../models/User.js';
import ResetToken from '../models/ResetToken.js';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Email received:', email);

    const user = await User.findOne({ email });
    console.log('User found:', user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    await new ResetToken({ userId: user._id, token }).save();

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    console.log('Sending email to:', user.email);
    await sendEmail(user.email, 'Password Reset', `Click to reset password: ${link}`);
    console.log('Email sent.');

    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error("Error in requestReset:", error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken) return res.status(400).json({ message: 'Invalid or expired token' });

    const user = await User.findById(resetToken.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await ResetToken.deleteOne({ _id: resetToken._id });

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(`✅ Login successful for ${email}`);


    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// controllers/authController.js

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error('Error in me:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
