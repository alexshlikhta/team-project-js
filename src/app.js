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
import { onClickWatched, onClickQueue } from './js/mylibrary';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchButton: document.querySelector('.btn-search'),
  filmsList: document.querySelector('.js-films'),
  watchedBtn: document.querySelector('#watched'),
  queueBtn: document.querySelector('#queue'),
};

const apiServices = new ApiServices();
const renderMarkup = new RenderMarkup();
const filmsPagination = new FilmsPagination();

async function init() {
  filmsPagination.init(await apiServices.fetchPopularFilms(), 'popular');
  renderMarkup.renderPopularFilms();
}
init();

refs.watchedBtn.addEventListener('click', onClickWatched);
refs.queueBtn.addEventListener('click', onClickQueue);
// async function onSearch(event) {
//   event.preventDefault();

//   if (refs.searchForm.elements.query.value === '') {
//     renderPopularFilms();
//   } else {
//     dataApiServices.query = refs.searchForm.elements.query.value;
//     refs.filmsList.innerHTML = '';
//     const dataSearched = await dataApiServices.fetchQueriedFilms();
//     renderMarkup(dataSearched.results, { showVotes: false });

//     let pagOptions = {
//       type: 'searched',
//       page: dataSearched.page,
//       total_pages: dataSearched.total_pages,
//       total_results: dataSearched.total_results,
//     };

//     filmsPagination.init(pagOptions);
//   }
// }

// refs.searchForm.addEventListener('input', debounce(onSearch, 500));
