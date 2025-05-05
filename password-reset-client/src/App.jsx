import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Signup />}/>
         <Route path="/login" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

