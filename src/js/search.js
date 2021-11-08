import debounce from 'lodash.debounce';
import { error } from "@pnotify/core";
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";
import searchAPI from './searchAPI'

import cardTemplate from '../templates/film-card.hbs';
import { filmCardTransformData } from './film-card-transform-data';


const search = new searchAPI()

const ref = {
    searchForm: document.querySelector('.search-form'),
    searchResults: document.querySelector('.films')
    }

function onSearch(event){
    if (ref.searchForm.elements.query.value === '')
    return
    event.preventDefault();
    search.query = ref.searchForm.elements.query.value;
    // search.setPage()
    ref.searchResults.innerHTML = ''

    search.fetchMovies().then(markUp).catch(error)
}

function markUp(results) {
    // console.log(results);
    if (results.length === 0) {
            throw new error({
                text: "Woops! Not Found!",
                delay: 1500,
              })
        }
    ref.searchResults.insertAdjacentHTML('beforeend',cardTemplate(filmCardTransformData(results)))
}

ref.searchForm.addEventListener('input', debounce(onSearch, 500))
  // refs.searchForm.addEventListener('submit', onSearch)



    
