import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import searchAPI from './searchAPI';
import cardTemplate from '../templates/film-card.hbs';
import { filmCardTransformData } from './film-card-transform-data';

export default function () {
  const search = new searchAPI();

function markUp(results) {
    if (results.length === 0) {
            throw new error({
                text: "Woops! Not Found!",
                delay: 1500,
              })
        }
    ref.searchResults.insertAdjacentHTML('beforeend',cardTemplate(filmCardTransformData(results)))
}

ref.searchForm.addEventListener('input', debounce(onSearch, 500))
