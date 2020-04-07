import axios from 'axios'

const api = axios.create({
  baseURL: 'https://twitelum-api.herokuapp.com'
})

api.interceptors.request.use((config) => {
  const token = localStorage.token
  if(token) {
      config.headers.Authorization = `X-AUTH-TOKEN ${token}`;
  }
  return config
}, (err) => {
  return Promise.reject(err);
})

export default api