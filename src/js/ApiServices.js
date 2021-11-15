import axios from 'axios';
import genresObj from '../db/genres.json';

const API_KEY = 'api_key=afc2024e71269fd3f1e3cbd71f7c4df4';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiServices {
  constructor() {
    this.page = 1;
    this.endPoint = 'search/movie?';
    this.url = '';
    this.query = '';
    this.movieId = '';
  }
  // get popular films from API DB
  async fetchPopularFilms() {
    let popularFilms = 'trending/movie/week?';
    try {
      const response = await axios.get(BASE_URL + popularFilms + API_KEY + `&page=${this.page}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  //get searched movies by name(query)
  async fetchQueriedFilms() {
    try {
      const response = await axios.get(
        // need to verify request's url (url ok)
        `${BASE_URL}${this.endPoint}${API_KEY}&language=en-US&page=${this.page}&query=${this.query}`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  // ============fetch by ID============//
  async fetchFilmById() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${this.movieId}?${API_KEY}&language=en-US`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  getMovieId() {
    return this.movieId;
  }
  setMovieId(currentMovieId) {
    return (this.movieId = currentMovieId);
  }
  // ================= method for patination ==================//
  getPage() {
    return this.page;
  }
  setPage(page) {
    this.page = page;
  }

  transformData(data) {
    return data.map(film => {
      film.year = film.release_date ? film.release_date.split('-')[0] : 'No information';

      const genresNamesArr = film.genre_ids.map(
        id => genresObj.genres.find(item => item.id === id).name,
      );

      if (genresNamesArr.length === 0) {
        film.genres = 'No information';
      } else if (genresNamesArr.length <= 3) {
        film.genres = genresNamesArr.join(', ');
      } else {
        film.genres = `${genresNamesArr[0]}, ${genresNamesArr[1]}, Other`;
      }
      return film;
    });
  }
}
