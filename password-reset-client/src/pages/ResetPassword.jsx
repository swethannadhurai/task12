import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  console.log("Deploying...");
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     // await axios.post(`/api/auth/reset-password/${token}`, { password });
     // await axios.post(`http://localhost:4000/api/auth/reset-password/${token}`, { password });
      await axios.post(`https://task12-4-f8f4.onrender.com/api/auth/reset-password/${token}`, { password });


      alert('Password reset successfully');
    } catch (error) {
      alert('Failed to reset password');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="New password"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}