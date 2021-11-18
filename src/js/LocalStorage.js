export default class LocalService {
  constructor() {
    this.keys = {
      WATCHED: 'Watched',
      QUEUE: 'Queue',
    };
  }
  load = key => {
    try {
      const localData = localStorage.getItem(key);
      return localData === null ? undefined : JSON.parse(localData);
    } catch (err) {
      console.error('Get error: ', err);
    }
  };
  save = (key, value) => {
    try {
      const localData = JSON.stringify(value);
      localStorage.setItem(key, localData);
    } catch (err) {
      console.error('Set error: ', err);
    }
  };
  remove = (key, value) => {
    const localData = this.load(key);
    localData.splice(localData.indexOf(value), 1);
    this.save(key, localData);
  };

  clean() {
    localStorage.setItem('total-cards', 1);
    localStorage.setItem('pagination-page', 1);
    localStorage.getItem('pagination-type', '');
  }

  setLocalTotalCards(number) {
    localStorage.setItem('total-cards', number);
  }

  getLocalTotalCards() {
    return localStorage.getItem('total-cards');
  }

  setPaginationPage(number) {
    localStorage.setItem('pagination-page', number);
  }

  getPaginationPage() {
    return localStorage.getItem('pagination-page');
  }

  setPaginationType(type) {
    localStorage.setItem('pagination-type', type);
  }

  getPaginationType() {
    return localStorage.getItem('pagination-type');
  }
}
