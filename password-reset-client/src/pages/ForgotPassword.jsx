import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.post('/api/auth/request-reset', { email });
      await axios.post('https://task12-4-f8f4.onrender.com/api/auth/request-reset', { email });

      alert('Reset link sent if email exists');
    } catch (error) {
      alert('Failed to send reset link');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}