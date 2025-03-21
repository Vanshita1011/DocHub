import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://doc-hub-b.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      //   window.location.href = "/login"; // Redirect if unauthorized
    }
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default api;
