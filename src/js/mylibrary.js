import ApiServices from './ApiServices.js';
import LocalService from './localStorage';
import RenderMarkup from './RenderMarkup';

const refs = {
  filmsList: document.querySelector('.js-films'),
};

export default class library {
  constructor() {
    this.localService = new LocalService();
    this.apiServices = new ApiServices();
    this.renderMarkup = new RenderMarkup();
  }

  onClickMyLibrary = () => {
    this.onClickWatched();
  };

  onClickWatched = () => {
    refs.filmsList.innerHTML = '';
    const localData = this.localService.load('Watched');

    if (!localData || localData.length === 0) {
      console.log('no fils added yet');
      refs.filmsList.innerHTML =
        '<li class="card__title"><p>Your watched list is empty! Please add some films!</p></li>';
    } else {
      const results = [];
      for (let id of localData) {
        this.apiServices.movieId = id;
        this.apiServices.fetchFilmById().then(data => {
          data.genre_ids = data.genres.map(item => item.id);
          results.push(data);
          this.renderMarkup.renderMarkup(results, { showVotes: true });
        });
      }
    }
  };

  onClickQueue = () => {
    refs.filmsList.innerHTML = '';
    const localData = this.localService.load('Queue');

    if (!localData || localData.length === 0) {
      console.log('no fils added yet');
      refs.filmsList.innerHTML =
        '<li class="card__title"><p>Your queue list is empty! Please add some films!</p></li>';
    } else {
      const results = [];
      for (let id of localData) {
        this.apiServices.movieId = id;
        this.apiServices.fetchFilmById().then(data => {
          data.genre_ids = data.genres.map(item => item.id);
          results.push(data);
          this.renderMarkup.renderMarkup(results, { showVotes: true });
        });
      }
    }
  };
}
