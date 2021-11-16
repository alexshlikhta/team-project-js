import modalCard from '../templates/modalCard.hbs';
import * as basicLightbox from 'basiclightbox';
import ApiServices from './ApiServices';
import ModalButtons from './ModalButtons.js';
import trailerTpl from '../templates/trailer.hbs';

const bodyRef = document.querySelector('.js-films');

const dataApiServices = new ApiServices();
const modalbuttons = new ModalButtons();

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
  modalbuttons.onModalButtons();
  // ============================open trailer======================================
  const dataTrailerById = await dataApiServices.fetchTrailerById();
  const trailerUrl = dataTrailerById.find(card => {
    card.type === 'Trailer';
    return card.key;
  });
  const buttonTrailerRef = document.querySelector('.js-button-trailer');

  buttonTrailerRef.addEventListener('click', onOpenTrailer);

  function onOpenTrailer() {
    const markupTrailer = trailerTpl(trailerUrl);
    const modalTrailer = basicLightbox.create(markupTrailer);
    modal.close();
    modalTrailer.show();
  }

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
      modalbuttons.clearListener();
    }
  }
}
