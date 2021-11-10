const homeBtn = document.querySelector('.menu__btn');
const myLibraryBtn = document.getElementById('my-library');

homeBtn.addEventListener('click', () => {
  homeBtn.classList.add('current');
  myLibraryBtn.classList.remove('current');
});

myLibraryBtn.addEventListener('click', () => {
  myLibraryBtn.classList.add('current');
  homeBtn.classList.remove('current');
});
