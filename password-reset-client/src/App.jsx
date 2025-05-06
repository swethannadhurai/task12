import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';



export default function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Signup />}/>
         <Route path="/Login" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}



