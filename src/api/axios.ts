import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Authorization': `Bearer ${TMDB_API_KEY}`
  }
});

export default axiosClient;