import axios from 'axios';

const API_KEY = 'api_key=afc2024e71269fd3f1e3cbd71f7c4df4';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiServices {
  constructor(page) {
    this.page = 1;
    this.endPoint = 'search/movie?';
    this.url = '';
    this.query = '';
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
  // get data about requested films from API DB
  // async fetchData() {
  //   try {
  //     const response = await axios.get(BASE_URL + `&page=${this.page}`);
  //     return response.data;
  //   } catch (error) {
  //     return error;
  //   }
  // }
  getPage() {
    return this.page;
  }
  setPage(page) {
    return (this.page = page);
  }
}
