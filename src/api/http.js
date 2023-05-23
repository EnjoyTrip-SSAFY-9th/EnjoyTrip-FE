import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL, // .env 로 옮기기
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
