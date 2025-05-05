// src/config.js

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:4000'
    : 'https://task12-4-f8f4.onrender.com';

export default API_BASE_URL;
