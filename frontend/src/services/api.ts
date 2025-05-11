import axios from 'axios';

// Use .env for flexibility (e.g., VITE_API_URL = http://localhost:3000)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // for cookie-based JWT
});

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    console.log('Login credentials:', credentials);
    const response = await API.post('/auth/login', credentials);
    console.log('Login response:', response.data);

    // Save JWT token
    localStorage.setItem('token', response.data.token);

    // Add full redirect URL
    return {
      ...response.data,
      redirectPath: API_URL + response.data.redirect,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getDashboard = async (userData: { redirectPath: string }) => {
    const url = userData.redirectPath.startsWith('/')
      ? `${API_URL}${userData.redirectPath}`  // attach to backend base URL
      : userData.redirectPath;
  
    console.log('Fetching dashboard for:', url);
  
    const response = await axios.get(url, {
      headers: {
        Authorization: getAuthHeader(),
      },
      withCredentials: true,
    });
  
    return response.data;
  };
