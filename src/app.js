import './sass/main.scss';
import './js/header';
import debounce from 'lodash.debounce';
import './js/modal';
import './js/modal-dev-v2'
import './js/modalDev';
import './js/totopbutton.js';
import './js/animationSvg';

import RenderMarkup from './js/RenderMarkup';
import FilmsPagination from './js/FilmsPagination.js';
import ApiServices from './js/ApiServices';
import { onClickWatched, onClickQueue, onClickMyLibrary } from './js/mylibrary';

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

async function init() {
  renderMarkup.renderPopularFilms();
  filmsPagination.init(await apiServices.fetchPopularFilms(), 'popular');
}
init();

refs.homeBtn.addEventListener('click', init);
refs.mylibrary.addEventListener('click', onClickMyLibrary);
refs.watchedBtn.addEventListener('click', onClickWatched);
refs.queueBtn.addEventListener('click', onClickQueue);
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

    let pagOptions = {
      page: dataSearched.page,
      total_pages: dataSearched.total_pages,
      total_results: dataSearched.total_results,
    };

    filmsPagination.init(pagOptions, 'searched');
  }
}
