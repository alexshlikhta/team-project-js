import * as basicLightbox from 'basiclightbox';
import axios from 'axios';
// =================axios=================//
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// const BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = 'afc2024e71269fd3f1e3cbd71f7c4df4';
const popularFilms = 'trending/movie/week';
const endPoint = 'search/movie';
const page = 1;
const query = 'moto';

// https: axios
//   .get(`/${popularFilms}?api_key=${API_KEY}`)
//   .then(res => console.log(res.data.results))
//   .catch(err => console.log(err));

// https: axios
//   .get(`/${endPoint}?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}`)
//   .then(res => console.log(res.data.results))
//   .catch(err => console.log(err));

// =============================================

const bodyRef = document.querySelector('body');

bodyRef.addEventListener('click', openLightbox);

function openLightbox(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  console.log(event.target.nodeName);
  console.log(event.target.attributes.id.value);

  const movie_id = event.target.attributes.id.value;

  axios
    .get(`/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
    .then(res => {
      console.log(res.data.title);
    })
    .catch(err => console.log(err));

  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();
}
