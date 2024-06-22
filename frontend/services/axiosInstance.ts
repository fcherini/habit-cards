import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api/", // use .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
