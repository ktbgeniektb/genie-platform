import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const getCsrfToken = () => {
  const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
  if (match) {
    return decodeURIComponent(match[2]);
  }
  return null;
};

export const login = async (email, password) => {
  await axios.get(`${import.meta.env.VITE_LARAVEL_ORIGIN}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });

  const token = getCsrfToken();
  if (token) {
    axios.defaults.headers.common['X-XSRF-TOKEN'] = token;
  }

  return axios.post(`${import.meta.env.VITE_LARAVEL_ORIGIN}/login`, {
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
