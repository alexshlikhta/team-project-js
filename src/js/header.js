const homeBtn = document.querySelector('.menu__btn');
const myLibraryBtn = document.getElementById('my-library');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search');
const searchLabel = document.querySelector('.form-label')
const header = document.querySelector('.header');
const libraryPage = document.querySelector('.library-page');
const containerLib = document.querySelector('.container-lib');
const watchedBtn = document.getElementById('watched');
const queueBtn = document.getElementById('queue');


homeBtn.addEventListener('click', onClickHome);
myLibraryBtn.addEventListener('click', onClickMyLibrary);

watchedBtn.addEventListener('click', onClickWatched);
queueBtn.addEventListener('click', onClickQueue);

searchInput.addEventListener('blur', async () => {
  setTimeout(()=>{
    if(searchInput.value) {
      searchLabel.classList.add('popup-label')
    } else {
      searchLabel.classList.remove('popup-label')
    }
  },100)
})

function onClickHome() {
  homeBtn.classList.add('current');
  myLibraryBtn.classList.remove('current');

  searchForm.classList.remove('visually-hidden');
  header.classList.remove('library-page');
  containerLib.classList.add('visually-hidden');
}

function onClickMyLibrary() {
  myLibraryBtn.classList.add('current');
  homeBtn.classList.remove('current');
  watchedBtn.classList.add('active');
  searchForm.classList.add('visually-hidden');
  header.classList.add('library-page');
  containerLib.classList.remove('visually-hidden');
  
}

function onClickWatched() {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
}

function onClickQueue() {
  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');
}

