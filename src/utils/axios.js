import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `https://${import.meta.env.VITE_API_KEY}.mockapi.io`
})

export default axiosInstance
