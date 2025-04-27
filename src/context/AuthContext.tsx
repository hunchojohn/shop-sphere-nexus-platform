
import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const isAuthenticated = user !== null;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // This is a mock authentication - in a real app, this would call an API
      // For demo purposes, we'll allow any login with minimal validation
      if (email && password.length >= 6) {
        const mockUser = {
          id: `user-${Math.random().toString(36).substring(2, 9)}`,
          name: email.split('@')[0],
          email
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // This is a mock registration - in a real app, this would call an API
      if (name && email && password.length >= 6) {
        const mockUser = {
          id: `user-${Math.random().toString(36).substring(2, 9)}`,
          name,
          email
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
