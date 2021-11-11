import './sass/main.scss';
import './js/header';
import ApiServices from './js/ApiServices.js';
import cardTemplate from './templates/film-card.hbs';
import loader from './js/loader';
import filmsPagination from './js/pagination.js';
import debounce from 'lodash.debounce';
import { filmCardTransformData } from './js/film-card-transform-data';
import './js/modal';
import './js/modalDev';
import './js/totopbutton.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  filmsList: document.querySelector('.js-films'),
  errorMsg: document.querySelector('#error'),
};

const dataApiServices = new ApiServices();

async function renderPopularFilms() {
  const dataPopular = await dataApiServices.fetchPopularFilms();
  renderMarkup(dataPopular.results);

  let pagOptions = {
    type: 'popular',
    page: dataPopular.page,
    total_pages: dataPopular.total_pages,
    total_results: dataPopular.total_results,
  };

  initPagination(pagOptions);
}
renderPopularFilms();

async function onSearch(event) {
  event.preventDefault();

  if (refs.searchForm.elements.query.value === '') {
    renderPopularFilms();
  } else {
    dataApiServices.query = refs.searchForm.elements.query.value;
    refs.filmsList.innerHTML = '';
    const dataSearched = await dataApiServices.fetchQueriedFilms();
    renderMarkup(dataSearched.results);

    let pagOptions = {
      type: 'searched',
      page: dataSearched.page,
      total_pages: dataSearched.total_pages,
      total_results: dataSearched.total_results,
    };

    initPagination(pagOptions);
  }
}

function renderMarkup(results) {
  loader.show();
  if (results.length === 0) {
    refs.errorMsg.classList.remove('hdr-hidden');
  } else {
    // refs.errorMsg.classList.add('hdr-hidden')
  }
  refs.filmsList.innerHTML = cardTemplate(filmCardTransformData(results));
  loader.close();
}

function initPagination(pagOptions) {
  filmsPagination(pagOptions).on('beforeMove', async event => {
    dataApiServices.setPage(event.page);
    let pagData = null;

    if (pagOptions.type === 'popular') {
      pagData = await dataApiServices.fetchPopularFilms();
    } else {
      pagData = await dataApiServices.fetchQueriedFilms();
    }

    renderMarkup(pagData.results);
  });
}

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
