import axios from 'axios';

const API_KEY = 'afc2024e71269fd3f1e3cbd71f7c4df4';
const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

export default class ApiServices {
  constructor() {}
  fetchPopularFilms() {
    return axios
      .get(url)
      .then(response => response.data.results)
      .catch(error => error);
  }
}
