import axios from "axios";

const API_KEY = "c3dfb97c4e42ba6803ce4a8859444b9b";
const BASE_URL = "https://api.themoviedb.org/3/";


export default class searchAPI {
    constructor() {
        this.query = '';
        // this.page = 1; -page будем міняти при пагінації  
    }
    fetchMovies() {
        return axios
        .get(`${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${this.query}`)
        .then(response => response.data.results)
        .catch(error => error);
    }
    // getGenres() {
    //     return axios
    //     .get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`)
    //     .then(response => response.data)
    //     .catch(error => error);
    // }
}