// AuthContext.tsx

import { useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { AuthContext } from './AuthContext'

interface User {
  id: string;
  role: 'user' | 'admin';
}

interface DecodedToken {
  user: {
    id: string;
    role: 'user' | 'admin';
  };
  exp: number;
  iat: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  url: string;
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  try {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      console.log("Decoded token:", decoded); // Debug
      
      if (Date.now() >= decoded.exp * 1000) {
        throw new Error('Token expired');
      }

      // 👇 Fix applied
      setUser({ id: decoded.user.id, role: decoded.user.role });
      localStorage.setItem('token', token);
    } else {
      throw new Error('No token');
    }
  } catch (error) {
    setUser(null);
    localStorage.removeItem('token');
  } finally {
    setLoading(false);
  }
}, [token]);


  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };
  const url = "http://localhost:3001";
  
  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, token, login, logout, loading, url }}>
      {children}
    </AuthContext.Provider>
  );
};
