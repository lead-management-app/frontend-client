import React, { createContext, useState, useEffect, useCallback } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clearAuth = useCallback(() => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const initializeAuth = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const refreshToken = sessionStorage.getItem('refreshToken');
      const storedUser = sessionStorage.getItem('user');

      if (accessToken && refreshToken && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);

        // Verify token is still valid
        try {
          const userData = await authApi.getCurrentUser();
          setUser(userData);
        } catch (error) {
          // Token might be expired, but refresh interceptor will handle it
          console.warn('Token verification failed:', error);
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, [clearAuth]);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const { user: userData, accessToken, refreshToken } = response;

      // Store tokens and user data
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      return { success: true, message: response.message };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await authApi.verifyEmail(token);
      return { success: true, ...response };
    } catch (error) {
      console.error('Email verification error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Email verification failed',
      };
    }
  };

  const setPassword = async (token, password) => {
    try {
      const response = await authApi.setPassword(token, password);
      return { success: true, message: response.message };
    } catch (error) {
      console.error('Set password error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Password setup failed',
      };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authApi.forgotPassword(email);
      return { success: true, message: response.message };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Password reset request failed',
      };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const response = await authApi.resetPassword(token, password);
      return { success: true, message: response.message };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Password reset failed',
      };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    verifyEmail,
    setPassword,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;