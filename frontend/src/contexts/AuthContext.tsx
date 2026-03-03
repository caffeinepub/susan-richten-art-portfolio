import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => { success: boolean; error?: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PASSWORD = 'admin123';
const AUTH_STORAGE_KEY = 'admin_authenticated';
const PASSWORD_STORAGE_KEY = 'admin_password';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const [storedPassword, setStoredPassword] = useState<string>(() => {
    return localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD;
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = (password: string): boolean => {
    if (password === storedPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const changePassword = (currentPassword: string, newPassword: string): { success: boolean; error?: string } => {
    if (currentPassword !== storedPassword) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    if (newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }
    setStoredPassword(newPassword);
    localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
