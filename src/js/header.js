const homeBtn = document.querySelector('.menu__btn');
const myLibraryBtn = document.getElementById('my-library');
const searchForm = document.querySelector('.search-form');
const header = document.querySelector('.header');
const libraryPage = document.querySelector('.library-page');
const containerLib = document.querySelector('.container-lib');
const watchedBtn = document.getElementById('watched');
const queueBtn = document.getElementById('queue');


homeBtn.addEventListener('click', () => {
  homeBtn.classList.add('current');
  myLibraryBtn.classList.remove('current');

  searchForm.classList.remove('visually-hidden');
  header.classList.remove('library-page');
  containerLib.classList.add('visually-hidden');
});

myLibraryBtn.addEventListener('click', () => {
  myLibraryBtn.classList.add('current');
  homeBtn.classList.remove('current');

  searchForm.classList.add('visually-hidden');
  header.classList.add('library-page');
  containerLib.classList.remove('visually-hidden');
});

watchedBtn.addEventListener('click', () => {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
});

queueBtn.addEventListener('click', () => {
  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');
});


