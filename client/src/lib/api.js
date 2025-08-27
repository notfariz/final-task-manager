// client/src/lib/api.js
import axios from "axios";

// Uses Vite env in prod; falls back to localhost in dev
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL });

// Auto-attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;