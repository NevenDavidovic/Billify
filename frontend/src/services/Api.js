import axios from "axios";

const api = axios.create({
  baseURL: "https://billify-gldw.onrender.com",
});

export default api;
