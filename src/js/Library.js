import ApiServices from './ApiServices.js';
import LocalService from './LocalStorage.js';
import RenderMarkup from './RenderMarkup.js';
import FilmsPagination from './FilmsPagination.js';

const refs = {
  filmsList: document.querySelector('.js-films'),
  paginationBox: document.getElementById('tui-pagination'),
};

export default class library {
  constructor() {
    this.localService = new LocalService();
    this.apiServices = new ApiServices();
    this.renderMarkup = new RenderMarkup();
    this.filmsPagination = new FilmsPagination();
  }

  onClickMyLibrary = () => {
    this.onClickWatched();
  };

  onClickWatched = () => {
    refs.filmsList.innerHTML = '';
    const localData = this.localService.load('Watched');

    if (!localData || localData.length === 0) {
      // console.log('no fils added yet');
      refs.paginationBox.classList.add('hidden');
      refs.filmsList.innerHTML =
        '<li class="card__title"><p>Your watched list is empty! Please add some films!</p></li>';
    } else {
      const results = [];
      refs.paginationBox.classList.remove('hidden');

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

      this.localService.setLocalTotalPages(counter);
      this.localService.setPaginationPage(1);
      this.filmsPagination.init('library');
    }
  };

  onClickQueue = () => {
    refs.filmsList.innerHTML = '';
    const localData = this.localService.load('Queue');

    if (!localData || localData.length === 0) {
      // console.log('no fils added yet');
      refs.paginationBox.classList.add('hidden');
      refs.filmsList.innerHTML =
        '<li class="card__title"><p>Your queue list is empty! Please add some films!</p></li>';
    } else {
      refs.paginationBox.classList.remove('hidden');
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
