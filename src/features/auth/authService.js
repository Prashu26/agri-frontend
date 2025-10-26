import axios from 'axios';

const API_URL = '/api/auth/';

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Registration failed. Please try again.'
    );
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Login failed. Please check your credentials.'
    );
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user from localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
