import debounce from 'lodash.debounce'

import { error } from "@pnotify/core";
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";
import searchAPI from './searchAPI'

// import cardMarkup from '../temp_card.hbs'

const search = new searchAPI()

const ref = {
    searchForm: document.querySelector('.search-form'),
    searchResults: document.querySelector('main container')
    }

function onSearch(event){
    event.preventDefault();
    search.query = ref.searchForm.elements.query.value;
    
    // search.setPage()
    // ref.searchResults.innerHTML = ''

    search.fetchMovies().then(markUp).catch(console.log)
}

function markUp(results) {
    console.log(results);
    if (results.length === 0) {
            throw new error({
                text: "Woops! Not Found!",
                delay: 1500,
              })
        }
    // ref.searchResults.insertAdjacentHTML('beforeend',cardMarkup(results))
}

ref.searchForm.addEventListener('input', debounce(onSearch, 500))
  // refs.searchForm.addEventListener('submit', onSearch)


 

    
