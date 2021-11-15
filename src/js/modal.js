import modalCard from '../templates/modalCard.hbs';
import * as basicLightbox from 'basiclightbox';
import ApiServices from './ApiServices';
import { onModalButtons, clearListener } from './ModalButtons.js'

const bodyRef = document.querySelector('.js-films');

const dataApiServices = new ApiServices();

bodyRef.addEventListener('click', openLightbox);

async function openLightbox(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  
  dataApiServices.setMovieId(event.target.attributes.id.value);
  const dataFilmById = await dataApiServices.fetchFilmById();

  const markup = modalCard(dataFilmById);
  const modal = basicLightbox.create(markup);
  modal.show();
  onModalButtons();
  // =========close by clicking on the cross==============//
  const closeBtnRef = document.querySelector('[data-action="modal-close-icon"]');
  closeBtnRef.addEventListener('click', () => {
    modal.close();
  });

  // =========close by clicking on ESCAPE==============//
  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
      clearListener();
    }
  }
}
