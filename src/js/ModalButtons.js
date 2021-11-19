import LocalService from './LocalStorage.js';
import library from './Library.js';

export default class ModalButtons {
  constructor() {
    this.storageAPI = new LocalService();
    this.refs = {};
    this.library = new library();
  }

  //=========declaring buttons handler function and listeners
  onModalButtons() {
    this.refs = {
      btnWatched: document.querySelector('.js-watched'),
      btnQueue: document.querySelector('.js-queue'),
      myLibraryBtn: document.getElementById('my-library'),
      watchedBtn: document.getElementById('watched'),
      queueBtn: document.getElementById('queue'),
    };
    this.refs.btnWatched.addEventListener('click', e => this.onWatchedBtn(e));
    this.refs.btnQueue.addEventListener('click', e => this.onQueueBtn(e));

    const watchedList = this.storageAPI.load(this.storageAPI.keys.WATCHED);
    const queueList = this.storageAPI.load(this.storageAPI.keys.QUEUE);

    //==============text content logic
    if (watchedList && watchedList.includes(this.refs.btnWatched.dataset.id)) {
      this.refs.btnWatched.textContent = 'remove from watched';
      this.refs.btnWatched.dataset.action = 'remove';
    }
    if (queueList && queueList.includes(this.refs.btnQueue.dataset.id)) {
      this.refs.btnQueue.textContent = 'remove from queue';
      this.refs.btnQueue.dataset.action = 'remove';
    }
  }
  //=========clearing listener func
  clearListener() {
    this.refs.btnWatched.removeEventListener('click', onWatchedBtn);
    this.refs.btnQueue.removeEventListener('click', onQueueBtn);
  }

  //=============watchen button func
  onWatchedBtn = event => {
    if (event.target.dataset.action === 'add') {
      this.addToWatched(event);
      this.renameWatchedBtn(event);
      return;
    }
    this.storageAPI.remove(this.storageAPI.keys.WATCHED, event.target.dataset.id);
    event.target.textContent = 'add to watched';
    event.target.dataset.action = 'add';
    if (this.refs.myLibraryBtn.classList.contains('current') && this.refs.watchedBtn.classList.contains('active')) {
      this.library.onClickWatched();
    }
  };
  //=========queue button func
  onQueueBtn = event => {
    if (event.target.dataset.action === 'add') {
      this.addToQueue(event);
      this.renameQueueBtn(event);
      return;
    }
    this.storageAPI.remove(this.storageAPI.keys.QUEUE, event.target.dataset.id);
    event.target.textContent = 'add to queue';
    event.target.dataset.action = 'add';
    if (this.refs.myLibraryBtn.classList.contains('current') && this.refs.queueBtn.classList.contains('active')) {
      this.library.onClickQueue();
    }
  };
  // ============ adding keys to local storage watched
  addToWatched = event => {
    const watchedList = this.storageAPI.load(this.storageAPI.keys.WATCHED);
    if (!watchedList) {
      this.storageAPI.save(this.storageAPI.keys.WATCHED, [event.target.dataset.id]);
      return;
    }
    watchedList.push(event.target.dataset.id);
    this.storageAPI.save(this.storageAPI.keys.WATCHED, watchedList);
  };
  //============ adding keys to local storage queue
  addToQueue = event => {
    const queueList = this.storageAPI.load(this.storageAPI.keys.QUEUE);
    if (!queueList) {
      this.storageAPI.save(this.storageAPI.keys.QUEUE, [event.target.dataset.id]);
      return;
    }
    queueList.push(event.target.dataset.id);
    this.storageAPI.save(this.storageAPI.keys.QUEUE, queueList);
  };
  //=========renaming buttons functions
  renameQueueBtn = event => {
    event.target.textContent = 'remove from queue';
    event.target.dataset.action = 'remove';
  };

  renameWatchedBtn = event => {
    event.target.textContent = 'remove from watched';
    event.target.dataset.action = 'remove';
  };
}
