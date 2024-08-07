import axios from "axios";

const api = axios.create({
  baseURL: "https://billify-gldw.onrender.com",
  // baseURL: "http://localhost:8081/",
});

export default api;
