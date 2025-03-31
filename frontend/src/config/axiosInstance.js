import axios from "axios";

const API = axios.create({
  baseURL: "https://attendancemanagementsystemapi.vercel.app",
  withCredentials: true, // ✅ Required for cookies to be sent
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
