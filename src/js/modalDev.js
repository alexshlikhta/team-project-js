import devListMarkup from '../templates/modalDevMarkup.hbs';
import * as basicLightbox from 'basiclightbox';

const devModalBtn = document.getElementById('open-dev-modal');
const body = document.body;
const overlay = document.querySelector('.modal-devs__overlay');

devModalBtn.addEventListener('click', openDevModal);

function openDevModal(event) {
  event.preventDefault();

  body.style.overflow = 'hidden';

  const devMarkup = devListMarkup();
  const modalDevMarkup = basicLightbox.create(devMarkup, {
    onShow: () => {
      body.style.overflow = 'hidden';
    },
    onClose: () => {
      body.style.overflow = 'inherit';
    },
  });

  modalDevMarkup.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modalDevMarkup.close();

      window.removeEventListener('keydown', closeModalHandler);
    }
  }

  const closeDevModalBtn = document.getElementById('modal-devs__close-btn');
  closeDevModalBtn.addEventListener('click', onCloseModal);
  function onCloseModal() {
    return modalDevMarkup.close();
  }
}
