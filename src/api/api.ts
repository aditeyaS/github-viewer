import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/vnd.github.v3+json",
  },
});

export default api;
