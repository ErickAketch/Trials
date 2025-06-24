import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuthContext, mockUsers } from '../mock/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      // For demo purposes, default to teacher
      setCurrentUser(mockUsers[0]);
      localStorage.setItem('currentUser', JSON.stringify(mockUsers[0]));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const switchRole = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  };

  const value = {
    currentUser,
    login,
    logout,
    switchRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};