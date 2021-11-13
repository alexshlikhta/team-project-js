import ApiServices from './ApiServices.js';
import cardTemplate from '../templates/film-card.hbs';
import { filmCardTransformData } from './film-card-transform-data';
import loader from './loader.js';

const refs = {
  filmsList: document.querySelector('.js-films'),
  errorMsg: document.querySelector('#error'),
  votesSpan: document.getElementsByClassName('films__votes'),
};

export default class RenderMarkup {
  constructor() {
    this.apiServices = new ApiServices();
  }

  renderMarkup = (results, { showVotes }) => {
    loader.show();

    if (results.length === 0) {
      refs.errorMsg.classList.remove('hdr-hidden');
    } else {
      // refs.errorMsg.classList.add('hdr-hidden')
    }

    refs.filmsList.innerHTML = cardTemplate(filmCardTransformData(results));

    if (showVotes) {
      for (const elem of refs.votesSpan) {
        elem.classList.remove('is-hidden');
      }
    } else {
      for (const elem of refs.votesSpan) {
        elem.classList.add('is-hidden');
      }
    }

    loader.close();
  };

  renderPopularFilms = async () => {
    loader.show();

    const dataPopular = await this.apiServices.fetchPopularFilms();
    refs.filmsList.innerHTML = cardTemplate(filmCardTransformData(dataPopular.results));

    let pagOptions = {
      type: 'popular',
      page: dataPopular.page,
      total_pages: dataPopular.total_pages,
      total_results: dataPopular.total_results,
    };

    loader.close();
  };
}
