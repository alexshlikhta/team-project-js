import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import searchAPI from './searchAPI';
import cardTemplate from '../templates/film-card.hbs';
import { filmCardTransformData } from './film-card-transform-data';

export default function () {
  const search = new searchAPI();


}
