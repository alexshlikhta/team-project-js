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

  const modal = renderModal(dataFilmById);
  modal.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}

function renderModal(data) {
  const markup = `
      <img src="https://image.tmdb.org/t/p/w780${data.poster_path}" width="800" height="600">
    `;
  return basicLightbox.create(markup);
}
