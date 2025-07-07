import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  });

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('session', JSON.stringify(found));
      return found;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
