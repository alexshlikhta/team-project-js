const homeBtn = document.querySelector('.menu__btn');
const myLibraryBtn = document.getElementById('my-library');

const searchForm = document.getElementById('search-form');
const usersLists = document.getElementById('users-lists')
const watchedBtn = document.getElementById('watched');
const queueBtn = document.getElementById('queue');

homeBtn.addEventListener('click', () => {
  homeBtn.classList.add('current');
  myLibraryBtn.classList.remove('current');
  searchForm.classList.remove('hdr-hidden');
usersLists.classList.add('hdr-hidden')
});

myLibraryBtn.addEventListener('click', () => {
  myLibraryBtn.classList.add('current');
  homeBtn.classList.remove('current');
  searchForm.classList.add('hdr-hidden');
  usersLists.classList.remove('hdr-hidden');

});

watchedBtn.addEventListener('click', () => {
  queueBtn.classList.remove('active');
  watchedBtn.classList.add('active');
})

queueBtn.addEventListener('click', () => {
  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');
})
