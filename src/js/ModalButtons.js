import LocalService from './localStorage.js';

  let btnWatched;
  let btnQueue;

  const refs = {
    btnWatched: document.querySelector('.js-watched'),
    btnQueue: document.querySelector('.js-queue'),
  }
export default class ModalButtons {
  constructor() {
 this.storageAPI = new LocalService();
}
//=====declaring buttons variables
// let btnWatched;
// let btnQueue;

//=========declaring buttons handler function and listeners
onModalButtons() {
  
  refs.btnWatched.addEventListener('click', onWatchedBtn());
  refs.btnQueue.addEventListener('click', onQueueBtn());

  const watchedList = this.storageAPI.load(this.storageAPI.keys.WATCHED);
  const queueList = this.storageAPI.load(this.storageAPI.keys.QUEUE);

  //==============text content logic
  if (watchedList && watchedList.includes(refs.btnWatched.dataset.id)) {
    refs.btnWatched.textContent = 'remove from watched';
    refs.btnWatched.dataset.action = 'remove';
  }
  if (queueList && queueList.includes(btnQueue.dataset.id)) {
    refs.btnQueue.textContent = 'remove from queue';
    refs.btnQueue.dataset.action = 'remove';
  }
}
//=========clearing listener func
 clearListener() {
  refs.btnWatched.removeEventListener('click', onWatchedBtn);
  refs.btnQueue.removeEventListener('click', onQueueBtn);
}

//=============watchen button func
 onWatchedBtn = (event) => {
  if (event.target.dataset.action === 'add') {
    addToWatched(event);
    renameWatchedBtn(event);
    return;
  }
  this.storageAPI.remove(this.storageAPI.keys.WATCHED, event.target.dataset.id);
  event.target.textContent = 'add to watched';
  event.target.dataset.action = 'add';
}
//=========queue button func
 onQueueBtn = (event) => {
  if (event.target.dataset.action === 'add') {
    addToQueue(event);
    renameQueueBtn(event);
    return;
  }
  storageAPI.remove(this.storageAPI.keys.QUEUE, event.target.dataset.id);
  event.target.textContent = 'add to queue';
  event.target.dataset.action = 'add';
}
// ============ adding keys to local storage watched
 addToWatched = (event) => {
  const watchedList = this.storageAPI.load(this.storageAPI.keys.WATCHED);
  if (!watchedList) {
    storageAPI.save(storageAPI.keys.WATCHED, [event.target.dataset.id]);
    return;
  }
  watchedList.push(event.target.dataset.id);
  this.storageAPI.save(this.storageAPI.keys.WATCHED, watchedList);
}
//============ adding keys to local storage queue
 addToQueue = (event) => {
  const queueList = this.storageAPI.load(this.storageAPI.keys.QUEUE);
  if (!queueList) {
    this.storageAPI.save(this.storageAPI.keys.QUEUE, [event.target.dataset.id]);
    return;
  }
  queueList.push(event.target.dataset.id);
  this.storageAPI.save(storageAPI.keys.QUEUE, queueList);
  }
//=========renaming buttons functions
 renameQueueBtn = (event) => {
  event.target.textContent = 'remove from queue';
  event.target.dataset.action = 'remove';
  }

 renameWatchedBtn = (event) => {
  event.target.textContent = 'remove from watched';
  event.target.dataset.action = 'remove';
  }
}