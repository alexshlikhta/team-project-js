import './sass/main.scss';
import ApiServices from './js/ApiServices.js';
import { pagination } from './js/pagination';
import cardTemplate from './templates/film-card.hbs';

// just for test
// pagination();
// fetchMoviesInFirstPage;

const dataApiServices = new ApiServices();

function renderMarkup(data) {
  const filmsList = document.querySelector('.js-films');
  filmsList.innerHTML = cardTemplate(data);
}

async function renderPopularFilms() {
  const dataPopular = await dataApiServices.fetchPopularFilms();
  renderMarkup(dataPopular);
}

renderPopularFilms();
