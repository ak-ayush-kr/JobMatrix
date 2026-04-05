import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 🔥 VERY IMPORTANT (for cookies / auth)
});

export default axiosInstance;