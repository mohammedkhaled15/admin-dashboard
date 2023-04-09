import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://ecommerce-api-v1-0.onrender.com/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
