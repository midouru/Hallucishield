import axios from "axios";

// Single axios instance pointing at the backend
const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;