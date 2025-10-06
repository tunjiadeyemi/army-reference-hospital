import Axios from "axios";
import Cookies from "js-cookie"
const apiUrl = import.meta.env.VITE_API_URL;


const isFormData = (data: any): data is FormData => {
  return typeof FormData !== "undefined" && data instanceof FormData;
};
const api = Axios.create({
  baseURL: apiUrl,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (isFormData(config.data)) {
    delete config.headers["Content-Type"]; 
   
  }

  return config;
});

export default api;
