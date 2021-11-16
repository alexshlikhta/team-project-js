import './sass/main.scss';
import './js/header';
import debounce from 'lodash.debounce';
import './js/modal';
import './js/modalDev';
import './js/totopbutton.js';
import './js/animationSvg';
import './js/switch-theme';

import RenderMarkup from './js/RenderMarkup';
import FilmsPagination from './js/FilmsPagination.js';
import ApiServices from './js/ApiServices';
import Library from './js/Library';
import LocalService from './js/LocalStorage';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchButton: document.querySelector('.btn-search'),
  filmsList: document.querySelector('.js-films'),
  watchedBtn: document.querySelector('#watched'),
  queueBtn: document.querySelector('#queue'),
  mylibrary: document.querySelector('#my-library'),
  homeBtn: document.querySelector('#home'),
};

const apiServices = new ApiServices();
const renderMarkup = new RenderMarkup();
const filmsPagination = new FilmsPagination();
const library = new Library();
const localService = new LocalService();

async function init() {
  let result = await apiServices.fetchPopularFilms();
  localService.clean();
  renderMarkup.renderPopularFilms();
  localService.setPaginationType('popular');
  localService.setLocalTotalPages(result.total_results);
  filmsPagination.init('popular');
}
init();

refs.homeBtn.addEventListener('click', init);
refs.mylibrary.addEventListener('click', library.onClickMyLibrary);
refs.watchedBtn.addEventListener('click', library.onClickWatched);
refs.queueBtn.addEventListener('click', library.onClickQueue);
refs.searchForm.addEventListener('input', debounce(onSearch, 500));

async function onSearch(event) {
  event.preventDefault();

  if (refs.searchForm.elements.query.value === '') {
    renderMarkup.renderPopularFilms();
  } else {
    apiServices.query = refs.searchForm.elements.query.value;
    refs.filmsList.innerHTML = '';
    const dataSearched = await apiServices.fetchQueriedFilms();
    renderMarkup.renderMarkup(dataSearched.results, { showVotes: false });
    localService.setPaginationType('query');
    localService.setLocalTotalPages(dataSearched.total_results);
    filmsPagination.init('query', refs.searchForm.elements.query.value);
  }
}
