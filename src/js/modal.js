import modalCard from '../templates/modalCard.hbs';
import * as basicLightbox from 'basiclightbox';
import ApiServices from './ApiServices';

const dataApiServices = new ApiServices();

const bodyRef = document.querySelector('.js-films');
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

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
