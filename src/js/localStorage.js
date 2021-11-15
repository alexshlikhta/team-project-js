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
      localStorage.getItem('last-tab');

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
}
