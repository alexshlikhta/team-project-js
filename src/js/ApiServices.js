import axios from 'axios';

const API_KEY = 'afc2024e71269fd3f1e3cbd71f7c4df4';
const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

export const fetchMoviesInFirstPage = axios
  .get(url)
  .then(res => console.log(res.data.results))
  .catch(error => error);
