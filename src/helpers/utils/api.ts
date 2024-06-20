import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const codes = [401, 404]
    if (codes.includes(error.response.status)) {
      throw Error('CUSTOM ERROR: Unauthorized or Not Found')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
