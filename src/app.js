import './sass/main.scss';
import './js/header.js';
import debounce from 'lodash.debounce';
import './js/modal.js';
import './js/modalDev.js';
import './js/totopbutton.js';
import './js/animationSvg.js';
import './js/switch-theme.js';

import RenderMarkup from './js/RenderMarkup.js';
import FilmsPagination from './js/FilmsPagination.js';
import ApiServices from './js/ApiServices.js';
import Library from './js/Library.js';
import LocalService from './js/LocalStorage.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchButton: document.querySelector('.btn-search'),
  filmsList: document.querySelector('.js-films'),
  watchedBtn: document.querySelector('#watched'),
  queueBtn: document.querySelector('#queue'),
  mylibrary: document.querySelector('#my-library'),
  homeBtn: document.querySelector('#home'),
  paginationBox: document.getElementById('tui-pagination'),
};

const apiServices = new ApiServices();
const renderMarkup = new RenderMarkup();
const filmsPagination = new FilmsPagination();
const library = new Library();
const localService = new LocalService();

async function init() {
  let result = await apiServices.fetchPopularFilms();
  refs.paginationBox.classList.remove('hidden');
  localService.clean();
  renderMarkup.renderPopularFilms();
  localService.setPaginationType('popular');
  localService.setLocalTotalCards(result.total_pages);
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
    init();
  } else {
    apiServices.query = refs.searchForm.elements.query.value;
    localService.setPaginationPage(1);
    const dataSearched = await apiServices.fetchQueriedFilms();
    renderMarkup.renderMarkup(dataSearched.results, { showVotes: false });
    localService.setPaginationType('query');
    localService.setLocalTotalCards(dataSearched.total_pages);
    filmsPagination.init('query', refs.searchForm.elements.query.value);
  }
}
