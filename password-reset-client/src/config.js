// src/config.js

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:4000'
    : 'https://task12-1-nx76.onrender.com/';

export default API_BASE_URL;
