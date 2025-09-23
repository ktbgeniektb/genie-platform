import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);
  }
  return config;
});


const getCsrfToken = () => {
  const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
  if (match) {
    return decodeURIComponent(match[2]);
  }
  return null;
};

export const login = async (email, password) => {
  const apiRoot = import.meta.env.VITE_LARAVEL_ORIGIN; // 例: http://localhost:9090

  await axios.get(`${apiRoot}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });

  return axios.post(`${apiRoot}/login`, {
    email,
    password,
  }, {
    withCredentials: true,
  });
};

export const getUser = () => {
  return axios.get('/user', {
    withCredentials: true,
  });
};
