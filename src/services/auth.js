// services/auth.js
import { createContext, useEffect, useState } from 'react';
import { loginUser, refreshAccessToken, setAuthToken } from './api';
import { getUserDetails, logoutUser } from './api';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (e.g., using local storage)
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuthToken(token);
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUserDetails();
      setUser(userDetails);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const loginResult = await loginUser({ email, password });
      const { token, refresh_token } = loginResult;
      setAuthToken(token);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refresh_token);
      setUser(loginResult);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setAuthToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const refresh_token = localStorage.getItem('refreshToken');
      if (refresh_token) {
        const newAccessToken = await refreshAccessToken(refresh_token);
        setAuthToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export { getUserDetails, logoutUser };