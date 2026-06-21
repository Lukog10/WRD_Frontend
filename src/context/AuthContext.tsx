import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Temporary mock registration data during flow
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate loading/checking session
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Accept any password/email for demo purposes
    if (email.trim() && password.trim()) {
      setIsLoading(false); // Set false BEFORE setting user to avoid flash of loading state
      setUser({
        name: email.split('@')[0],
        email: email,
      });
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (name.trim() && email.trim() && password.trim()) {
      // Set pending user for OTP verification phase
      setPendingUser({ name, email });
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // In mock, any 4/6 digit code works
    if (otp.length >= 4) {
      const verified = pendingUser ?? { name: 'Demo User', email: 'demo@example.com' };
      setPendingUser(null);
      setIsLoading(false); // Set false BEFORE setting user to avoid flash
      setUser(verified);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    return !!email.trim();
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setPendingUser(null); // Clear any pending registration state
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyOtp,
        forgotPassword,
        logout,
      }}
    >
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
