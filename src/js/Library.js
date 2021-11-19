import ApiServices from './ApiServices.js';
import LocalService from './LocalStorage.js';
import RenderMarkup from './RenderMarkup.js';
import FilmsPagination from './FilmsPagination.js';

export default class library {
  constructor() {
    this.localService = new LocalService();
    this.apiServices = new ApiServices();
    this.renderMarkup = new RenderMarkup();
    this.filmsPagination = new FilmsPagination();
    this.refs = {
      filmsList: document.querySelector('.js-films'),
      paginationBox: document.getElementById('tui-pagination'),
    };
  }

  onClickMyLibrary = () => {
    this.onClickWatched();
  };

  onClickWatched = () => {
    this.refs.paginationBox.classList.add('hidden');

    this.refs.filmsList.innerHTML = '';
    const localData = this.localService.load('Watched');

    if (!localData || localData.length === 0) {
      this.refs.filmsList.innerHTML =
        '<li class="card__title custom"><p>Your watched list is empty! Please add some films!</p></li>';
    } else {
      const results = [];
      let counter = 0;
      for (let id of localData) {
        counter++;
        this.apiServices.movieId = id;
        this.apiServices.fetchFilmById().then(data => {
          data.genre_ids = data.genres.map(item => item.id);
          results.push(data);
          this.renderMarkup.renderMarkup(results, { showVotes: true });
        });
      }

      this.localService.setLocalTotalCards(counter);
      this.localService.setPaginationPage(1);
      this.filmsPagination.init('library');
    }
  };

  onClickQueue = () => {
    this.refs.filmsList.innerHTML = '';
    const localData = this.localService.load('Queue');

    if (!localData || localData.length === 0) {
      this.refs.filmsList.innerHTML =
        '<li class="card__title custom"><p>Your queue list is empty! Please add some films!</p></li>';
    } else {
      const results = [];
      let counter = 0;
      for (let id of localData) {
        counter++;
        this.apiServices.movieId = id;
        this.apiServices.fetchFilmById().then(data => {
          data.genre_ids = data.genres.map(item => item.id);
          results.push(data);
          this.renderMarkup.renderMarkup(results, { showVotes: true });
        });
      }

      this.localService.setLocalTotalCards(counter);
      this.localService.setPaginationPage(1);
      this.filmsPagination.init('library');
    }
  };
}
