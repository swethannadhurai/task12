import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Log In
        </button>
      </form>
      <div className="mt-4">
        Forgot your password?{' '}
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Reset it here
        </Link>
      </div>
      <div className="mt-2">
        Don't have an account?{' '}
        <Link to="/" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}