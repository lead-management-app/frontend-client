import axiosInstance from "../utils/axiosInstance";

const authApi = {
  // Register new user
  register: async (userData) => {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  },

  // Verify email token
  verifyEmail: async (token) => {
    const response = await axiosInstance.post("/auth/verify/", { token });
    return response.data;
  },

  // Set password after email verification
  setPassword: async (token, password) => {
    const response = await axiosInstance.post("/auth/set-password", {
      token,
      password,
    });
    return response.data;
  },

  // Refresh access token
  refresh: async (refreshToken) => {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },

  // Forgot password request
  forgotPassword: async (email) => {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await axiosInstance.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      const response = await axiosInstance.post("/auth/logout", {
        refreshToken,
      });
      return response.data;
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },
};

export default authApi;
