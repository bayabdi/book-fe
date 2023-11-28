import axios from 'axios';

const instance = axios.create({
  // You can set up base URLs, headers, and other configurations here
  baseURL: 'http://localhost:8000',
  timeout: 5000, // Timeout in milliseconds
});

export default instance;
