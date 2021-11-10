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

  const markup = `
      <img src="https://image.tmdb.org/t/p/w780${dataFilmById.poster_path}" width="800" height="600">
    `;
  const lightbox = basicLightbox.create(markup);
  lightbox.show();
}
