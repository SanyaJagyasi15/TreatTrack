import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
  baseURL: "http://localhost:8080/api/receipts/",
  withCredentials: true,
});

export default api;
