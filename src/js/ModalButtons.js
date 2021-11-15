import LocalService from './LocalStorage.js';

let storageAPI = new LocalService();

//=====declaring buttons variables
let btnWatched;
let btnQueue;

//=========declaring buttons handler function and listeners
export function onModalButtons() {
  btnWatched = document.querySelector('.js-watched');
  btnQueue = document.querySelector('.js-queue');
  btnWatched.addEventListener('click', onWatchedBtn);
  btnQueue.addEventListener('click', onQueueBtn);

  const watchedList = storageAPI.load(storageAPI.keys.WATCHED);
  const queueList = storageAPI.load(storageAPI.keys.QUEUE);

  //==============text content logic
  if (watchedList && watchedList.includes(btnWatched.dataset.id)) {
    btnWatched.textContent = 'remove from watched';
    btnWatched.dataset.action = 'remove';
  }
  if (queueList && queueList.includes(btnQueue.dataset.id)) {
    btnQueue.textContent = 'remove from queue';
    btnQueue.dataset.action = 'remove';
  }
}
//=========clearing listener func
export function clearListener() {
  btnWatched.removeEventListener('click', onWatchedBtn);
  btnQueue.removeEventListener('click', onQueueBtn);
}

//=============watchen button func
function onWatchedBtn(event) {
  if (event.target.dataset.action === 'add') {
    addToWatched(event);
    renameWatchedBtn(event);
    return;
  }
  storageAPI.remove(storageAPI.keys.WATCHED, event.target.dataset.id);
  event.target.textContent = 'add to watched';
  event.target.dataset.action = 'add';
}
//=========queue button func
function onQueueBtn(event) {
  if (event.target.dataset.action === 'add') {
    addToQueue(event);
    renameQueueBtn(event);
    return;
  }
  storageAPI.remove(storageAPI.keys.QUEUE, event.target.dataset.id);
  event.target.textContent = 'add to queue';
  event.target.dataset.action = 'add';
}
// ============ adding keys to local storage watched
function addToWatched(event) {
  const watchedList = storageAPI.load(storageAPI.keys.WATCHED);
  if (!watchedList) {
    storageAPI.save(storageAPI.keys.WATCHED, [event.target.dataset.id]);
    return;
  }
  watchedList.push(event.target.dataset.id);
  storageAPI.save(storageAPI.keys.WATCHED, watchedList);
}
//============ adding keys to local storage queue
function addToQueue(event) {
  const queueList = storageAPI.load(storageAPI.keys.QUEUE);
  if (!queueList) {
    storageAPI.save(storageAPI.keys.QUEUE, [event.target.dataset.id]);
    return;
  }
  queueList.push(event.target.dataset.id);
  storageAPI.save(storageAPI.keys.QUEUE, queueList);
}
//=========renaming buttons functions
function renameQueueBtn(event) {
  event.target.textContent = 'remove from queue';
  event.target.dataset.action = 'remove';
}

function renameWatchedBtn(event) {
  event.target.textContent = 'remove from watched';
  event.target.dataset.action = 'remove';
}
