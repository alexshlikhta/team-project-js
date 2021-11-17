import axios from 'axios';
import genresObj from '../db/genres.json';
import LocalService from './LocalStorage.js';

const API_KEY = 'api_key=afc2024e71269fd3f1e3cbd71f7c4df4';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiServices {
  constructor() {
    this.endPoint = 'search/movie?';
    this.url = '';
    this.query = '';
    this.movieId = '';
    this.localService = new LocalService();
  }

  // get popular films from API DB
  async fetchPopularFilms() {
    let popularFilms = 'trending/movie/week?';
    try {
      const response = await axios.get(
        BASE_URL +
          popularFilms +
          API_KEY +
          '&language=en-US&page=' +
          `&page=${this.localService.getPaginationPage()}`,
      );
      this.localService.setLocalTotalPages(response.data.total_results);
      this.localService.setPaginationPage(response.data.page);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  // get searched movies by name(query)
  async fetchQueriedFilms() {
    try {
      const response = await axios.get(
        // need to verify request's url (url ok)
        BASE_URL +
          this.endPoint +
          API_KEY +
          '&language=en-US&page=' +
          `${this.localService.getPaginationPage()}&query=${this.query}`,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  // ============fetch film by ID============//
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
  // ================fetch trailer by ID==============//
  async fetchTrailerById() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${this.movieId}/videos?${API_KEY}&language=en-US`,
      );
      return response.data.results;
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

  transformData(data) {
    let dataToMap;

    if (data.results) {
      dataToMap = data.results;
    } else {
      dataToMap = data;
    }

    return dataToMap.map(film => {
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
