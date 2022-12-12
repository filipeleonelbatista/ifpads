import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.106:3000"
  // baseURL: "https://ifpads-production.up.railway.app"
})

export default api