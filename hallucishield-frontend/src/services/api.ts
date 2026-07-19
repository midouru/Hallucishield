import axios from "axios";

const API = axios.create({
  // cast import.meta to any to avoid TypeScript error: Property 'env' does not exist on type 'ImportMeta'
  baseURL: (import.meta as any).env?.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;