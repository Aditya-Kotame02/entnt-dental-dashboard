import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      if (user.role === 'Admin') navigate('/admin/dashboard');
      else navigate('/patient/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <input className="w-full border p-2 mb-4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2 mb-4" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 w-full text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
