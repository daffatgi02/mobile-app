// services/api.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getArticles = async () => {
  try {
    const response = await api.get('/articles');
    return response.data.articles;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data.loginResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post('/auth/refresh-token', { refresh_token: refreshToken });
    return response.data.access_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get('/auth/getdetail');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getHomepageMessage = async () => {
  try {
    const response = await api.get('/homepage');
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data.product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getArticleById = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}`);
    return response.data.article;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const performImagePrediction = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await api.post('/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.Predictions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
