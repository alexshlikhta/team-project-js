
import './sass/main.scss';

// open modal
const modalWindow = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  const url = evt.target.dataset.source;
  modalWindow.classList.add("is-open");
  modalImage.setAttribute('src', url)
}

// close modal
const closeButton = document.querySelector('.lightbox__button');
closeButton.addEventListener('click', onCloseModalClick);
function onCloseModalClick() {
  modalWindow.classList.remove("is-open");
  modalImage.setAttribute('src', '')
}

// backdrop modal close
const backdropModalClose = document.querySelector('.lightbox__overlay')
backdropModalClose.addEventListener('click', onBackdropClick);
function onBackdropClick(evt) {
  if(evt.currentTarget === evt.target) {
    onCloseModalClick()
  }
}

// modal close ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    onCloseModalClick()
  }
})

