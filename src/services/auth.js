// src/services/auth.js
import axios from 'axios';

const API_URL = 'https://api.stage.datacite.org';

export default {
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/token`, {
        username,
        password,
        grant_type:'password',
      });

      const user = response.data;

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid username or password');
      }

      throw error;
    }
  },
  logout() {
    localStorage.removeItem('user');
  },
  isLoggedIn() {
    return !!localStorage.getItem('user');
  },
  getAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? { 'Authorization': `Bearer ${user.access_token}` } : {};
  },
  getToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.access_token : '';
  }
};
